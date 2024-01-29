import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Prisma,
  RecipientType,
  Ticket,
  TicketMode,
  TicketStatus,
} from '@prisma/client';
import axios, { AxiosResponse } from 'axios';
import { Producer } from 'kafkajs';
import { ConfigKeys } from 'src/config/app.configuration';
import { StorageService } from 'src/storage/storage.service';
import { TicketService } from 'src/ticket/ticket.service';
import { WebsocketGateway } from 'src/websocket.gateway';
import {
  chatBotMessageMap,
  CXxSALES,
  ecatInfoMacroMessage,
  ExperienceCenterOffMessage,
  getOTPMessage,
  mdcatInfoMacroMessage,
  menuMessageTriggerKeys,
  messageRouterMap,
  offWorkingHourMessage,
  OTPIssueMessages,
  promoBundleMessages,
  requestAgentStageMessages,
  requestAgentStages,
  revisionOfferMessages,
  theBoysNumber,
  ticketSolvedStages,
  TRIGGER_MENU_KEYS,
  underMaintenanceMessage,
} from 'src/whatsapp/flows';
import { TicketTag } from '../constants/enums/ticket.tags.enum';
import { InitiatedTicket } from './models/initiated.ticket.model';
import { WhatsAppDTO } from './models/whatsapp.message.model';
import {
  IWhatsAppReplyMessage,
  MessageType,
  WhatsAppReplyMessage,
} from './models/whatsAppReplyMessage';
import Time from './time';
import { ConsumerService } from '../consumer/consumer.service';
import { AgentMessageContent } from './interface/agent.message.content';
import { DownloadMedia } from './interface/download.media';
import { GajniService } from 'src/gajni/gajni.service';
import { AppSyncService } from 'src/app-sync/app-sync.service';
import { User } from 'src/models/user.model';
import { UserGradeGroup } from 'src/models/user.grade.group.model';
import { CohortService } from '../cohort/cohort.service';

@Injectable()
export class WhatsappService implements OnModuleInit {
  private producer: Producer;
  private readonly whatsAppBearerToken: string;
  private readonly whatsAppApiUrl: string;
  private readonly metaApiBaseUrl: string;
  private readonly s3BucketUrl: string;
  private readonly saarifTopic = 'SAARIF_WHATSAPP_MESSAGES_TOPIC';

  constructor(
    private readonly ticketService: TicketService,
    @Inject(forwardRef(() => WebsocketGateway))
    private readonly websocketGateway: WebsocketGateway,
    private readonly config: ConfigService,
    private readonly storage: StorageService,
    private readonly consumerService: ConsumerService,
    private readonly gajniService: GajniService,
    private readonly appSyncService: AppSyncService,
    private readonly cohortService: CohortService,
  ) {
    this.whatsAppBearerToken =
      this.config.get<string>(ConfigKeys.WHATSAPP_BEARER_TOKEN) ?? '';
    this.whatsAppApiUrl =
      this.config.get<string>(ConfigKeys.WHATSAPP_API_URL) ?? '';
    this.metaApiBaseUrl =
      this.config.get<string>(ConfigKeys.META_API_BASE_URL) ?? '';
    this.s3BucketUrl =
      this.config.get<string>(ConfigKeys.S3_BUCKET_SAARIF_URL) ?? '';
  }

  async processWebhookResponse(payload: WhatsAppDTO) {
    this.saveMessage(payload).finally(); // TODO: Enable on live

    console.log('processWebhookResponse', JSON.stringify(payload));

    if (!payload.shouldProcess) {
      console.log('IN shouldProcess', JSON.stringify(payload));
      return;
    }

    const ticket = await this.initializeTicket(payload);

    // INFO: Kill switch for testing
    if (
      !!ticket.currentMenu &&
      theBoysNumber[payload.from] &&
      payload.messageContent === 'CODE RED!!!'
    ) {
      return this.ticketKillSwitch(ticket);
    }

    const initiatedTicket = new InitiatedTicket(ticket, payload);

    const ticketMessage = await this.createUserTicketMessage(initiatedTicket);

    try {
      initiatedTicket.ticket = this.solveTicket(initiatedTicket);

      // await this.sendMessageOnRouteToAgent(initiatedTicket);

      initiatedTicket.ticket = this.routeTicketToAgent(initiatedTicket);

      // TODO: Improve it if possible
      initiatedTicket.ticket = await this.handleInteractiveMenuMessage(
        initiatedTicket,
      );

      initiatedTicket.ticket = await this.handleAutoTriggerMessage(
        initiatedTicket,
      );

      initiatedTicket.ticket = await this.handleOTPMessage(initiatedTicket);

      initiatedTicket.ticket = await this.handleTicketOffHourMessage(
        initiatedTicket.ticket,
      );

      initiatedTicket.ticket = await this.handleTicketHolidayMessage(
        initiatedTicket.ticket,
      );

      // await this.handleUnderMaintenanceMessage(initiatedTicket.ticket);
    } catch (err) {
      console.log('processWebhookResponseErr==>', err);
    }

    initiatedTicket.ticket = await this.updateTicket(initiatedTicket.ticket);

    await this.addToSales(initiatedTicket);

    this.websocketGateway.emitUpdatedTicketMessage(initiatedTicket.ticket);
    this.websocketGateway.emitChatMessage(ticketMessage);
  }

  onModuleInit() {
    this.getProducer()
      .then(() => console.log('Trigger producer ready!'))
      .catch((error) => console.error('Trigger producer failed', error));
  }

  initWebhook(query: any) {
    console.log('Initializing WebHook ', query);
    if (
      query['hub.mode'] == 'subscribe' &&
      query['hub.verify_token'] == 'SECURE_TOKEN_WEBHOOK'
    ) {
      return query['hub.challenge'];
    } else {
      throw new HttpException(
        {
          message: 'Invalid query sent',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async sendAgentMessage(ticket: Ticket, messageContent: AgentMessageContent) {
    const whatsAppReplyMessage = await this.generateAgentReplyMessage(
      messageContent,
    );
    const messageResponse = await this.sendWhatsAppMessage(
      ticket.number,
      whatsAppReplyMessage,
    );
    console.log('messageResponse', JSON.stringify(messageResponse));
    const agentTicketMessageInput: Prisma.TicketMessageUncheckedCreateInput = {
      content: whatsAppReplyMessage.toString,
      recipientID: ticket.agentEmail as string,
      recipientType: RecipientType.AGENT,
      ticketID: ticket.id,
      mimeType: messageContent.mimeType,
      mediaURL: whatsAppReplyMessage.filePath,
    };
    return this.ticketService.createTicketMessage(agentTicketMessageInput);
  }

  async downloadMedia(ticketMessageID): Promise<DownloadMedia | null> {
    const ticketMessage = await this.ticketService.getTicketMessage(
      ticketMessageID,
    );

    if (ticketMessage.mediaURL && ticketMessage.mimeType) {
      const media = await this.getMediaByLink(ticketMessage.mediaURL);
      return { media, mimeType: ticketMessage.mimeType };
    }

    return null;
  }

  private async getUserData(number: string) {
    try {
      const user = await this.appSyncService.getUserByNumber(number);
      if (!user) {
        return null;
      }
      if (!user.userGradeGroupID) {
        return new User(user);
      }
      const userGradeGroup = new UserGradeGroup(
        await this.appSyncService.getUserGradeGroup(user.userGradeGroupID),
      );
      const grade = userGradeGroup.grades.find(
        (grade) => grade.board.id === user.boardID,
      );
      return new User({
        ...user,
        userGradeGroupName: userGradeGroup.name,
        gradeName: grade?.name,
        boardName: grade?.board.name,
      });
    } catch (err) {
      console.log(JSON.stringify(err));
      return null;
    }
  }

  private async addToSales(initiatedTicket: InitiatedTicket) {
    const [fName = '', lName = ''] =
      initiatedTicket.whatsAppPayload.username?.split(' ');

    try {
      switch (initiatedTicket.ticket.currentMenu) {
        case TRIGGER_MENU_KEYS.DHAMAKAYDAR_OFFER_KEY:
          return await this.cohortService.createCohortCall({
            id: `${initiatedTicket.whatsAppPayload.from}_${TicketTag.DHAMAKAYDAR_OFFER}`,
            number: `+${initiatedTicket.ticket.number}`,
            fName,
            lName,
            tags: [TicketTag.DHAMAKAYDAR_OFFER],
            interestedIn: TicketTag.DHAMAKAYDAR_OFFER,
            cohortID: CXxSALES,
          });

        case TRIGGER_MENU_KEYS.MEC_FEE_INFO_KEY:
        case TRIGGER_MENU_KEYS.MEC_EARLY_BIRD_INFO_KEY:
        case TRIGGER_MENU_KEYS.MEC_FRIENDS_REFERRAL_INFO_KEY:
          return await this.cohortService.createCohortCall({
            id: `${initiatedTicket.whatsAppPayload.from}_${TicketTag.MEC_INFO}`,
            number: `+${initiatedTicket.ticket.number}`,
            fName,
            lName,
            tags: [TicketTag.MEC_INFO],
            interestedIn: TicketTag.MEC_INFO,
            cohortID: CXxSALES,
          });

        default:
          console.log(
            'initiatedTicket.ticket.currentMenu',
            initiatedTicket.ticket.currentMenu,
          );
      }
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  }

  private getMessageKey(initiatedTicket: InitiatedTicket) {
    const messageRouter =
      messageRouterMap[
        initiatedTicket.whatsAppPayload.interactiveMessageId ?? ''
      ];

    const menuKey = this.getTriggerMenuKey(initiatedTicket.whatsAppPayload);

    return (
      menuKey ??
      messageRouter?.(
        new User(
          (initiatedTicket.ticket.userProperties ?? {}) as unknown as User,
        ),
      ) ??
      initiatedTicket.whatsAppPayload.interactiveMessageId
    );
  }

  private async getMediaByLink(link: string) {
    const res = await axios.get<string>(link);
    // return Buffer.from(res.data, 'binary').toString('base64');
    return res.data;
  }

  private async generateAgentReplyMessage(agentMessage: AgentMessageContent) {
    let message: IWhatsAppReplyMessage;

    let path = '';
    const [fileType] = (agentMessage.mimeType ?? '')?.split?.('/');
    if (fileType && agentMessage.file && agentMessage.fileName) {
      const subPath = `${fileType}/${
        Date.now() * Math.random()
      }.${agentMessage.fileName?.split?.('.')?.pop()}`;
      path = `${this.s3BucketUrl}/${subPath}`;
      await this.storage.upload(
        subPath,
        agentMessage.file,
        agentMessage.mimeType as string,
      );
    }

    if (agentMessage.messageContent) {
      message = {
        type: MessageType.TEXT,
        text: {
          body: agentMessage.messageContent,
          preview_url: true,
        },
      };
    } else if (['application', 'text'].includes(fileType)) {
      message = {
        type: MessageType.DOCUMENT,
        document: {
          link: path,
          filename: agentMessage.fileName as string,
        },
      };
    } else {
      message = {
        type: fileType as MessageType,
        [fileType]: {
          link: path,
        },
      };
    }

    return new WhatsAppReplyMessage(message);
  }

  // INFO: Kill switch for testing
  private async ticketKillSwitch(ticket: Ticket) {
    const ticketUpdateInput: Prisma.TicketUpdateWithoutMessagesInput = {
      status: TicketStatus.CLOSED,
    };
    await this.ticketService.updateTicket({ id: ticket.id }, ticketUpdateInput);

    const codeRed: IWhatsAppReplyMessage = {
      type: MessageType.TEXT,
      text: {
        body: `Ticket:${ticket.id} is closed`,
      },
    };

    const killReply = new WhatsAppReplyMessage(codeRed);

    await this.sendWhatsAppMessage(ticket.number, killReply);
    return;
  }

  private updateTicket(ticket: Ticket) {
    const ticketUpdateWithoutMessagesInput: Prisma.TicketUpdateWithoutMessagesInput =
      {
        status: ticket.status,
        currentMenu: ticket.currentMenu,
        tags: ticket.tags ?? [],
        mode: ticket.mode,
        isRead: ticket.mode !== TicketMode.AGENT,
        workingHoursMessageExpiry: ticket.workingHoursMessageExpiry,
        lastMessageAt: new Date(),
      };
    return this.ticketService.updateTicket(
      { id: ticket.id },
      ticketUpdateWithoutMessagesInput,
    );
  }

  private getTriggerMenuKey(payload: WhatsAppDTO) {
    return menuMessageTriggerKeys[payload.messageContent];
  }

  private async handleAutoTriggerMessage(initiatedTicket: InitiatedTicket) {
    const chatBotReply = this.getAutoTriggerMessage(initiatedTicket);

    if (!chatBotReply) {
      return initiatedTicket.ticket;
    }

    await this.sendChatBotMessages(chatBotReply, initiatedTicket.ticket);

    return this.setTicketAutoTags(initiatedTicket);
  }

  private sendOTPMessage(otpCode: string, ticket: Ticket) {
    const otpCodeMessage = new WhatsAppReplyMessage(getOTPMessage(otpCode));
    return this.sendChatBotMessage(otpCodeMessage, ticket);
  }

  private async handleOTPMessage(initiatedTicket: InitiatedTicket) {
    const chatBotReply = this.getOTPIssueMessage(initiatedTicket);

    if (!chatBotReply) {
      return initiatedTicket.ticket;
    }

    const otpCode = await this.gajniService.generateOTP(
      `+${initiatedTicket.ticket.number}`,
    );

    const otpTags: TicketTag[] = [TicketTag.OTP_ISSUE];

    if (otpCode) {
      await this.sendOTPMessage(otpCode, initiatedTicket.ticket);
      otpTags.push(TicketTag.OTP_SENT);
    } else {
      await this.sendChatBotMessages(chatBotReply, initiatedTicket.ticket);
    }

    return this.setTicketTags(initiatedTicket.ticket, otpTags);
  }

  private getAutoTriggerMessage(initiatedTicket: InitiatedTicket) {
    return (
      promoBundleMessages[initiatedTicket.whatsAppPayload.messageContent] ??
      revisionOfferMessages[initiatedTicket.whatsAppPayload.messageContent] ??
      mdcatInfoMacroMessage[initiatedTicket.whatsAppPayload.messageContent] ??
      ecatInfoMacroMessage[initiatedTicket.whatsAppPayload.messageContent]
    );
  }

  private getOTPIssueMessage(initiatedTicket: InitiatedTicket) {
    return OTPIssueMessages[initiatedTicket.whatsAppPayload.messageContent];
  }

  private isTicketSolved(initiatedTicket: InitiatedTicket) {
    const isAgentMode = initiatedTicket.ticket.mode === TicketMode.AGENT;

    if (isAgentMode) {
      return false;
    }

    return (
      !!initiatedTicket.whatsAppPayload.interactiveMessageId &&
      ticketSolvedStages[initiatedTicket.whatsAppPayload.interactiveMessageId]
    );
  }

  private isAgentRequested(initiatedTicket: InitiatedTicket) {
    const isAgentMode = initiatedTicket.ticket.mode === TicketMode.AGENT;

    if (isAgentMode) {
      return false;
    }

    const isInteractiveAgentMessage =
      !!initiatedTicket.whatsAppPayload.interactiveMessageId &&
      requestAgentStages[initiatedTicket.whatsAppPayload.interactiveMessageId];

    const isInteractiveMessageIgnored =
      !initiatedTicket.whatsAppPayload.interactiveMessageId &&
      !!initiatedTicket.ticket.currentMenu;

    const isAutoTriggerMessage = !!this.getAutoTriggerMessage(initiatedTicket);

    return (
      isInteractiveAgentMessage ||
      isInteractiveMessageIgnored ||
      isAutoTriggerMessage
    );
  }

  private async handleTicketHolidayMessage(ticket: Ticket) {
    if (ticket.mode === TicketMode.CHAT_BOT) {
      return ticket;
    }

    const time = new Time();

    if (!(time.isHoliday && time.isAfter(ticket.workingHoursMessageExpiry))) {
      return ticket;
    }

    // INFO: change message according to need
    const holidayMessageReply = new WhatsAppReplyMessage(
      ExperienceCenterOffMessage,
    );
    await this.sendChatBotMessage(holidayMessageReply, ticket);

    return { ...ticket, workingHoursMessageExpiry: time.nextDay };
  }

  private async handleTicketOffHourMessage(ticket: Ticket) {
    if (ticket.mode === TicketMode.CHAT_BOT) {
      return ticket;
    }

    const time = new Time();

    if (
      time.isHoliday ||
      time.isWorkingHour ||
      time.isBefore(ticket.workingHoursMessageExpiry)
    ) {
      return ticket;
    }

    const offHourMessage = new WhatsAppReplyMessage(offWorkingHourMessage);
    await this.sendChatBotMessage(offHourMessage, ticket);

    return { ...ticket, workingHoursMessageExpiry: time.nextShiftStart };
  }

  private async handleUnderMaintenanceMessage(ticket: Ticket) {
    if (ticket.mode === TicketMode.CHAT_BOT) {
      return;
    }

    const time = new Time();

    if (!time.isWorkingHour) {
      return;
    }

    const underMaintenance = new WhatsAppReplyMessage(underMaintenanceMessage);
    return this.sendChatBotMessage(underMaintenance, ticket);
  }

  private async sendWhatsAppMessage(
    from: string,
    messageContent: WhatsAppReplyMessage,
  ): Promise<AxiosResponse<any, any>> {
    console.log(
      `!!!INFO: Calling WhatsApp API to user with phone number: ${from} with message: ${JSON.stringify(
        messageContent,
      )}`,
    );

    const response = await axios.post(
      this.whatsAppApiUrl,
      {
        messaging_product: 'whatsapp',
        to: from,
        ...messageContent,
      },
      {
        headers: {
          Authorization: `Bearer ${this.whatsAppBearerToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('resp >>>', response);

    return response.data;
  }

  private async uploadFileToS3(initiatedTicket: InitiatedTicket) {
    const data = await this.getMediaFromMeta(
      initiatedTicket.whatsAppPayload.file,
    );
    const mimeType = data.mimeType;
    const [fileType, subType] = mimeType.split('/');

    const extension =
      initiatedTicket.whatsAppPayload.documentExtension ?? subType;

    await this.storage.upload(
      `${fileType}/${initiatedTicket.whatsAppPayload.file}.${extension}`,
      data.mediaBuffer,
      mimeType,
    );

    return [mimeType, fileType, extension];
  }

  private async generateUserTicketMessageCreateInput(
    initiatedTicket: InitiatedTicket,
  ): Promise<Prisma.TicketMessageUncheckedCreateInput> {
    const fileID = initiatedTicket.whatsAppPayload.file;
    let fileType, mimeType, extension;

    if (fileID) {
      [mimeType, fileType, extension] = await this.uploadFileToS3(
        initiatedTicket,
      );
    }

    return {
      recipientID: initiatedTicket.whatsAppPayload.from,
      content:
        initiatedTicket.whatsAppPayload.interactiveMessageContent ??
        initiatedTicket.whatsAppPayload.messageContent,
      mimeType,
      mediaURL: mimeType
        ? `${this.s3BucketUrl}/${fileType}/${fileID}.${extension}`
        : '',
      metaID: fileID,
      isRead: false,
      recipientType: RecipientType.USER,
      ticketID: initiatedTicket.ticket.id,
    };
  }

  private async sendChatBotMessage(
    whatsAppReplyMessage: WhatsAppReplyMessage,
    ticket: Ticket,
  ) {
    await this.sendWhatsAppMessage(ticket.number, whatsAppReplyMessage);
    const botTicketMessageInput: Prisma.TicketMessageUncheckedCreateInput = {
      content: whatsAppReplyMessage.toString,
      recipientID: RecipientType.CHAT_BOT,
      recipientType: RecipientType.CHAT_BOT,
      ticketID: ticket.id,
    };
    return this.ticketService.createTicketMessage(botTicketMessageInput);
  }

  private async sendChatBotMessages(
    whatsAppReplyMessages: IWhatsAppReplyMessage[],
    ticket: Ticket,
  ) {
    for (const message of whatsAppReplyMessages) {
      if (message.delay) {
        setTimeout(async () => {
          await this.sendChatBotMessage(
            new WhatsAppReplyMessage(message),
            ticket,
          );
        }, message.delay);
      } else {
        await this.sendChatBotMessage(
          new WhatsAppReplyMessage(message),
          ticket,
        );
      }
    }
  }

  private async prepareCreateTicketInput(payload: WhatsAppDTO) {
    const ticketInput: Prisma.TicketCreateInput = {
      username: payload.username,
      number: payload.from,
    };

    const userProperties = await this.getUserData(`+${payload.from}`);
    if (userProperties) {
      ticketInput.userProperties =
        userProperties as unknown as Prisma.JsonObject;
    }

    console.log('TICKET INPUT CHECK', JSON.stringify(ticketInput));

    return ticketInput;
  }

  private async initializeTicket(payload: WhatsAppDTO) {
    try {
      return await this.ticketService.getActiveTicketByNumber(payload.from);
    } catch (err) {
      const ticketInput = await this.prepareCreateTicketInput(payload);
      return this.ticketService.createTicket(ticketInput);
    }
  }

  private async createUserTicketMessage(initiatedTicket: InitiatedTicket) {
    const ticketMessageInput = await this.generateUserTicketMessageCreateInput(
      initiatedTicket,
    );

    return this.ticketService.createTicketMessage(ticketMessageInput);
  }

  private routeTicketToAgent(initiatedTicket: InitiatedTicket) {
    if (this.isAgentRequested(initiatedTicket)) {
      return { ...initiatedTicket.ticket, mode: TicketMode.AGENT };
    }
    return initiatedTicket.ticket;
  }

  private async sendMessageOnRouteToAgent(initiatedTicket: InitiatedTicket) {
    const requestAgentStageMessage =
      !!initiatedTicket.whatsAppPayload.interactiveMessageId &&
      requestAgentStageMessages[
        initiatedTicket.whatsAppPayload.interactiveMessageId
      ];

    if (this.isAgentRequested(initiatedTicket) && requestAgentStageMessage) {
      await this.sendChatBotMessages(
        requestAgentStageMessage,
        initiatedTicket.ticket,
      );
    }
  }

  private solveTicket(initiatedTicket: InitiatedTicket) {
    if (this.isTicketSolved(initiatedTicket)) {
      return { ...initiatedTicket.ticket, status: TicketStatus.SOLVED };
    }
    return initiatedTicket.ticket;
  }

  private setTicketTags(ticket: Ticket, tags: TicketTag[]) {
    let ticketTags = (ticket.tags as Array<TicketTag>) ?? [];
    ticketTags.push(...tags);
    ticketTags = ticketTags.filter(Boolean);
    ticketTags = [...new Set(ticketTags)];
    return {
      ...ticket,
      tags: ticketTags as Prisma.JsonArray,
      currentMenu: tags[0],
    } as Ticket;
  }

  private setTicketAutoTags(initiatedTicket: InitiatedTicket) {
    let tag: TicketTag | false;
    switch (
      menuMessageTriggerKeys[initiatedTicket.whatsAppPayload.messageContent]
    ) {
      case TRIGGER_MENU_KEYS.DHAMAKAYDAR_OFFER_KEY:
        tag = TicketTag.DHAMAKAYDAR_OFFER;
        break;
      default:
        tag =
          (initiatedTicket.whatsAppPayload.messageContent in
            mdcatInfoMacroMessage &&
            TicketTag.MDCAT) ||
          (initiatedTicket.whatsAppPayload.messageContent in
            promoBundleMessages &&
            TicketTag.EXAM_BUNDLE) ||
          (initiatedTicket.whatsAppPayload.messageContent in
            revisionOfferMessages &&
            TicketTag.REVISION_BUNDLE) ||
          (initiatedTicket.whatsAppPayload.messageContent in
            ecatInfoMacroMessage &&
            TicketTag.ECAT);
    }

    const tags: TicketTag[] = [];
    if (tag) {
      tags.push(tag);
    }

    return this.setTicketTags(initiatedTicket.ticket, tags);
  }

  private getChatBotReply(initiatedTicket: InitiatedTicket) {
    if (!initiatedTicket.ticket.currentMenu) {
      return undefined;
    }
    return chatBotMessageMap[initiatedTicket.ticket.currentMenu];
  }
  private async handleInteractiveMenuMessage(initiatedTicket: InitiatedTicket) {
    if (
      initiatedTicket.ticket.mode !== TicketMode.CHAT_BOT ||
      initiatedTicket.whatsAppPayload.messageContent in OTPIssueMessages ||
      (initiatedTicket.whatsAppPayload.interactiveMessageId &&
        initiatedTicket.whatsAppPayload.interactiveMessageId in
          OTPIssueMessages)
    ) {
      return initiatedTicket.ticket;
    }

    const messageKey = this.getMessageKey(initiatedTicket);

    initiatedTicket.ticket = this.setTicketAutoTags(initiatedTicket);

    initiatedTicket.ticket.currentMenu = messageKey ?? '1';

    const chatBotReply = this.getChatBotReply(initiatedTicket);

    if (!chatBotReply) {
      return initiatedTicket.ticket;
    }

    await this.sendChatBotMessages(chatBotReply, initiatedTicket.ticket);

    return initiatedTicket.ticket;
  }

  private saveMessage(payload: WhatsAppDTO) {
    return this.producer.send({
      topic: this.saarifTopic,
      messages: [{ value: JSON.stringify(payload) }],
    });
  }

  private async getMediaFromMeta(
    mediaID: string,
  ): Promise<{ mediaBuffer: Buffer; mimeType: string; id: string }> {
    const response = await axios.get(`${this.metaApiBaseUrl}/${mediaID}`, {
      headers: {
        Authorization: `Bearer ${this.whatsAppBearerToken}`,
        'Content-Type': 'application/json',
      },
    });

    console.log(
      '!!!INFO: response from ` getMediaFromMeta :>> ',
      response.data,
    );

    const media = await axios.get(response.data.url, {
      headers: {
        Authorization: `Bearer ${this.whatsAppBearerToken}`,
        'Content-Type': 'application/json',
      },
      responseType: 'arraybuffer',
    });

    console.log(
      '!!!INFO: response from media from downloadable media response :>> ',
      media.data,
    );

    return {
      id: response.data.id,
      mimeType: response.data.mime_type,
      mediaBuffer: media.data,
    };
  }
  private async getProducer() {
    this.producer = await this.consumerService.getProducer();
  }
}

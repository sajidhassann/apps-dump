import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { ConfigKeys } from './config/app.configuration';
import { WhatsAppDTO } from './whatsapp/models/whatsapp.message.model';
import { TicketService } from './ticket/ticket.service';
import { UserWhatsappTrackingService } from './user-whatsapp-tracking/user-whatsapp-tracking.service';
import { WebsocketGateway } from './websocket.gateway';
import { ConsumerService } from './consumer/consumer.service';
import { WhatsappService } from './whatsapp/whatsapp.service';

// import { ConsumerService } from './consumer/consumer.service';

@Injectable()
export class AppService {
  private readonly whatsAppBearerToken: string;
  private readonly whatsAppApiUrl: string;
  private readonly metaApiBaseUrl: string;
  private readonly s3BucketUrl: string;

  private readonly saarifTopic = 'SAARIF_WHATSAPP_MESSAGES_TOPIC';

  constructor(
    private readonly userWhatsappTrackingService: UserWhatsappTrackingService,
    private readonly ticketService: TicketService,
    private readonly websocketGateway: WebsocketGateway,
    private readonly config: ConfigService,
    private readonly whatsappService: WhatsappService,
    private readonly consumerService: ConsumerService,
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
  initWebhook(query: any) {
    return this.whatsappService.initWebhook(query);
  }

  sendWebhookResponse(body: WhatsAppDTO) {
    return this.whatsappService.processWebhookResponse(new WhatsAppDTO(body));
  }

  getHello(): string {
    return 'Hoş Geldiniz Muaziz Saarifim!';
  }

  async importCohort(request) {
    const data = JSON.stringify(request);
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://crm-importer:8080/cohort',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };
    const response = await axios.request(config);
    return response.data;
  }
}

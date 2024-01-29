import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigKeys } from '../config/app.configuration';

import {
  ChatPostMessageArguments,
  KnownBlock,
  LogLevel,
  WebAPICallResult,
  WebClient,
} from '@slack/web-api';
import { SlackUser } from './models/slack.user.model';

@Injectable()
export class SlackService {
  private readonly envName: string;

  private readonly slackUserToken: string;
  private readonly slackBotToken: string;

  private readonly slackClient: WebClient;

  private logger = new Logger(SlackService.name);

  constructor(private readonly config: ConfigService) {
    this.envName = this.config.get<string>(ConfigKeys.ENV_NAME) ?? 'dev';

    this.slackUserToken =
      this.config.get<string>(ConfigKeys.SLACK_USER_OAUTH_TOKEN) ?? 'dev';
    this.slackBotToken =
      this.config.get<string>(ConfigKeys.SLACK_BOT_OAUTH_TOKEN) ?? 'dev';

    this.slackClient = new WebClient(this.slackBotToken, {
      //logLevel: LogLevel.DEBUG,
      logLevel: LogLevel.INFO,
    });
  }

  async getSlackUserByEmail(email: string): Promise<SlackUser> {
    const response = await this.slackClient.users.lookupByEmail({ email });

    this.logger.log('Response: ', response);

    return new SlackUser(response.user);
  }

  async sendSlackMessage(params: {
    message: string;
    channelID: string;
  }): Promise<WebAPICallResult> {
    this.logger.log('Sending message to Slack');

    const response: WebAPICallResult = await this.slackClient.chat.postMessage({
      channel: params.channelID,
      text: params.message,
    });

    this.logger.log(
      `Send message to Slack response: ${JSON.stringify(response)}`,
    );

    return response;
  }

  async sendSlackMessageWithAttachments(params: {
    channelID: string;
    message: string;
    mediaURLs?: string[];
  }): Promise<WebAPICallResult> {
    const { channelID, message, mediaURLs = null } = params;

    // Construct the blocks array with media attachments
    const blocks = mediaURLs?.flatMap((url) => {
      const fileType = url?.split?.('.')?.pop()?.toLowerCase?.();
      let blockType = 'image';

      if (fileType === 'mp4' || fileType === 'mov') {
        blockType = 'video';
      } else if (fileType === 'mp3' || fileType === 'wav') {
        blockType = 'audio';
      }

      if (blockType === 'image') {
        return [
          {
            type: 'image',
            block_id: `media_${Date.now()}${Math.random()}`,
            image_url: url,
            alt_text: 'media',
          } as KnownBlock,
        ];
      } else {
        return [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*${blockType.toUpperCase()}*:\n<${url}|Click here to view the ${blockType}>`,
            },
          } as KnownBlock,
        ];
      }
    });

    // Send the message with media attachments
    return this.slackClient.chat.postMessage({
      channel: channelID,
      text: message,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: message,
          },
        },
        ...(blocks ?? []),
      ],
    } as ChatPostMessageArguments);
  }
}

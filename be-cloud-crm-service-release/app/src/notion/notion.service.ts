import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client as NotionClient } from '@notionhq/client';
import { CreatePageResponse } from '@notionhq/client/build/src/api-endpoints';
import { ConfigKeys } from '../config/app.configuration';
import { SlackUser } from '../slack/models/slack.user.model';
import { SlackService } from '../slack/slack.service';
import { ComplaintTicketSource } from './enums/complaint.ticket.source.enum';
import { ICreateComplaintTicketRequest } from './interfaces/create.complaint.ticket.request.interface';
import { NotionCreateComplaintTicketResponse } from './models/notion.create.complaint.ticket.response.model';
import { NotionUser } from './models/notion.user.model';

@Injectable()
export class NotionService {
  private readonly envName: string;
  private readonly notionApiKey: string;
  private readonly complaintTrackerDatabaseID: string;

  private notionClient: NotionClient;

  private logger = new Logger(NotionService.name);

  constructor(
    private readonly config: ConfigService,
    private slackService: SlackService,
  ) {
    this.envName = this.config.get<string>(ConfigKeys.ENV_NAME) ?? 'dev';

    this.notionApiKey =
      this.config.get<string>(ConfigKeys.NOTION_SECRET_KEY) ?? 'dev';
    this.complaintTrackerDatabaseID =
      this.config.get<string>(
        ConfigKeys.NOTION_COMPLAINT_TRACKER_DATABASE_ID,
      ) ?? 'dev';

    this.notionClient = new NotionClient({
      auth: this.notionApiKey,
    });
  }

  async listNotionUsers(): Promise<NotionUser[]> {
    const rawUsers: any[] = [];
    let start_cursor: string | undefined = undefined;

    do {
      const response = await this.notionClient.users.list({
        page_size: 100,
        start_cursor,
      });

      rawUsers.push(...response?.results);

      start_cursor = response?.next_cursor ?? null;
    } while (start_cursor !== null);

    this.logger.log(`Total users: ${rawUsers.length}`);

    return rawUsers.map((user) => new NotionUser(user));
  }

  async addNewComplaintTicketToNotion(
    data: ICreateComplaintTicketRequest,
  ): Promise<CreatePageResponse> {
    this.logger.log('Complaint Ticket details: ', data);

    const users = await this.listNotionUsers();

    // find the user ID by data.agentEmail and save in agentID
    const agent = users.find((user) => user.email === data.agentEmail) ?? null;

    const assignees = data?.assigneeIDs?.map((id) => {
      return { id };
    });

    const assignedTeams = data?.teams?.map((name) => {
      return { name };
    });

    this.logger.log('Support Agent from email: ', agent);
    this.logger.log('Assigned Teams: ', assignedTeams);

    const properties: any = {
      'Issue Description': [
        {
          type: 'text',
          text: {
            content: data.title,
          },
        },
      ],
      'User Number (on Maqsad)': data.studentNumber,
      'App Version': { name: data.appVersion },
      Priority: { name: data.priority },
      'Support Agent': [{ id: agent?.id }],
      'Person Assigned': assignees,
      Team: assignedTeams,
      Type: { name: data.type },
      Source: { name: ComplaintTicketSource.SAARIF },
    };

    const children: any = [
      {
        object: 'block',
        type: 'heading_2',
        heading_2: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: 'Description',
              },
            },
          ],
        },
      },
      {
        object: 'block',
        type: 'callout',
        callout: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: data?.errorDetails?.message ?? 'NOOOOOOO',
              },
            },
          ],
          icon: {
            emoji: '🧨',
          },
          color: 'red_background',
        },
      },
      {
        object: 'block',
        type: 'heading_2',
        heading_2: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: 'Screen Recording or Screenshot',
              },
            },
          ],
        },
      },
      {
        object: 'block',
        type: 'column_list',
        column_list: {
          children: [
            {
              object: 'block',
              type: 'column',
              column: {
                children: [
                  {
                    object: 'block',
                    type: 'paragraph',
                    paragraph: {
                      rich_text: [
                        {
                          type: 'text',
                          text: {
                            content: '*embed image or video here',
                          },
                          annotations: {
                            italic: true,
                          },
                        },
                      ],
                      color: 'gray',
                    },
                  },
                  {
                    object: 'block',
                    type: 'embed',
                    embed: {
                      url: data?.errorDetails?.mediaUrls?.[0] ?? '',
                    },
                  },
                ],
              },
            },
            {
              object: 'block',
              type: 'column',
              column: {
                children: [
                  {
                    object: 'block',
                    type: 'paragraph',
                    paragraph: {
                      rich_text: [
                        {
                          type: 'text',
                          text: {
                            content: '*embed image or video here',
                          },
                          annotations: {
                            italic: true,
                          },
                        },
                      ],
                      color: 'gray',
                    },
                  },
                  {
                    object: 'block',
                    type: 'embed',
                    embed: {
                      url: data?.errorDetails?.mediaUrls?.[1] ?? '',
                    },
                  },
                ],
              },
            },
            {
              object: 'block',
              type: 'column',
              column: {
                children: [
                  {
                    object: 'block',
                    type: 'paragraph',
                    paragraph: {
                      rich_text: [
                        {
                          type: 'text',
                          text: {
                            content: '*embed image or video here',
                          },
                          annotations: {
                            italic: true,
                          },
                        },
                      ],
                      color: 'gray',
                    },
                  },
                  {
                    object: 'block',
                    type: 'embed',
                    embed: {
                      url: data?.errorDetails?.mediaUrls?.[2] ?? '',
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      {
        object: 'block',
        type: 'heading_2',
        heading_2: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: 'Why is this happening?',
              },
            },
          ],
        },
      },
      {
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: '*to be answered by the team addresses',
              },
              annotations: {
                italic: true,
              },
            },
          ],
          color: 'gray',
        },
      },
      {
        object: 'block',
        type: 'heading_2',
        heading_2: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: 'When will it be fixed?',
              },
            },
          ],
        },
      },
      {
        object: 'block',
        type: 'to_do',
        to_do: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: 'Immediately',
              },
            },
          ],
          checked: false,
        },
      },
      {
        object: 'block',
        type: 'to_do',
        to_do: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: 'Next Release',
              },
            },
          ],
          checked: false,
        },
      },
      {
        object: 'block',
        type: 'to_do',
        to_do: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: '*(enter date or week here)',
              },
              annotations: {
                italic: true,
              },
            },
          ],
          checked: false,
          color: 'gray',
        },
      },
    ];
    try {
      const response = await this.notionClient.pages.create({
        icon: {
          type: 'emoji',
          emoji: '🐛',
        },
        parent: {
          database_id: this.complaintTrackerDatabaseID,
        },
        properties: properties,
        children: children,
      });

      this.logger.log('Notion response: ', response);

      const ticket = new NotionCreateComplaintTicketResponse(response);

      // TODO: Send slack message on ticket creation
      const agentSlackUser = await this.slackService.getSlackUserByEmail(
        data.agentEmail,
      );

      const assigneeSlackUsersPromises: Promise<SlackUser>[] | undefined =
        assignees?.map((assignee) => {
          return new Promise(async (resolve) => {
            const assigneeUser = users.find((user) => user.id === assignee?.id);

            const assigneeEmail = assigneeUser?.person?.email ?? '';

            this.logger.log(`Assignee user: ${assigneeUser}`);
            this.logger.log(`Assignee email: ${assigneeEmail}`);

            const assigneeSlackUser =
              await this.slackService.getSlackUserByEmail(assigneeEmail);

            //this.logger.log(
            //  `Assignee slack user: ${JSON.stringify(assigneeSlackUser)}`,
            //);

            resolve(assigneeSlackUser);
          });
        });

      const assigneeSlackUsers: SlackUser[] = await Promise.all(
        assigneeSlackUsersPromises ?? [],
      );

      this.logger.log(`Agent slack user: ${JSON.stringify(agentSlackUser)}`);
      this.logger.log(
        `Assignee slack users: ${JSON.stringify(assigneeSlackUsers)}`,
      );

      const assigneeSlackUsersIds = assigneeSlackUsers
        .map((user) => `<@${user.id}>`)
        .join(' ');

      //await this.slackService.sendSlackMessage({
      //  channelID: 'C02KLNHSR2N',
      //  message: `${data.title}\n\n*Student Phone:* ${data.studentNumber}\n\n*Complaint ID:* <${ticket.url}|${ticket.complaintId}>\n\nCc ${assigneeSlackUsersIds}`,
      //});

      await this.slackService.sendSlackMessageWithAttachments({
        channelID: 'C02KLNHSR2N',
        message: `
${data.title}\n\n${
          data?.errorDetails?.message ?? 'Student is really stressed out!'
        }\n\n*Student Phone:* ${data.studentNumber}\n\n*Complaint ID:* <${
          ticket.url
        }|${ticket.complaintId}>\n\n*Ticket Owner:* <@${
          agentSlackUser.id
        }>\nCc ${assigneeSlackUsersIds}`,
        mediaURLs: data?.errorDetails?.mediaUrls ?? undefined,
      });

      return response;
    } catch (error) {
      throw new HttpException(error, error.status);
    }
  }
}

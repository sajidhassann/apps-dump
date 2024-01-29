import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { FilesInterceptor } from '@nestjs/platform-express';
import { CreatePageResponse } from '@notionhq/client/build/src/api-endpoints';
import { ConfigKeys } from '../config/app.configuration';
import { EnvironmentsEnum } from '../utils/enums/env.names.enum';
import { CreateComplaintTicketRequestDTO } from './dto/create.complaint.ticket.request.dto';
import { ComplaintTicketPriority } from './enums/complaint.ticket.priority.enum';
import { ComplaintTicketTeam } from './enums/complaint.ticket.team.enum';
import { ComplaintTicketType } from './enums/complaint.ticket.type.enum';
import { ICreateComplaintTicketRequest } from './interfaces/create.complaint.ticket.request.interface';
import { NotionUser } from './models/notion.user.model';
import { NotionService } from './notion.service';

@Controller('notion')
export class NotionController {
  private readonly envName: string;
  private readonly logger = new Logger(NotionController.name);

  constructor(
    private readonly config: ConfigService,
    private readonly notionService: NotionService,
  ) {
    this.envName = this.config.get<string>(ConfigKeys.ENV_NAME) ?? 'dev';
  }

  @Get('/users')
  async listNotionUsers(): Promise<NotionUser[]> {
    this.logger.log('Request received: list all notion users');
    return this.notionService.listNotionUsers();
  }

  @Post('/complaint')
  async createNewComplaintTicket(
    @Body() request: CreateComplaintTicketRequestDTO,
  ): Promise<CreatePageResponse> {
    this.logger.log('New student complaint ticket received');
    //console.log(request);

    if (this.envName === EnvironmentsEnum.RELEASE)
      request.assigneeIDs?.push?.('8681eb6d-e5f1-424a-ad1a-694d0ddd17e5'); // Tag Daniyal Atif in every ticket

    const data: ICreateComplaintTicketRequest = {
      title: request.title ?? 'New Bug Complaint From Saarif',
      priority: request.priority ?? ComplaintTicketPriority.UNKNOWN,
      studentNumber: request.studentNumber ?? '',
      appVersion: request?.appVersion ?? 'Unknown',
      teams: request.teams ?? [ComplaintTicketTeam.MOBILE],
      type: request.type ?? ComplaintTicketType.IN_APP,
      agentEmail: request?.agentEmail ?? 'ammar@maqsad.io',
      assigneeIDs: request?.assigneeIDs ?? [
        '8681eb6d-e5f1-424a-ad1a-694d0ddd17e5',
      ],
      errorDetails: request?.errorDetails ?? {
        message: 'No error details provided',
      },
    };

    return this.notionService.addNewComplaintTicketToNotion(data);
  }
}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { AgentController } from './agent/agent.controller';
import { AgentService } from './agent/agent.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CohortService } from './cohort/cohort.service';
import { ConsumerService } from './consumer/consumer.service';
import { DatabaseService } from './database/database.service';
import { PrismaService } from './database/prisma.service';
import { NotionController } from './notion/notion.controller';
import { NotionService } from './notion/notion.service';
import { StorageService } from './storage/storage.service';
import { TicketRepository } from './ticket/repository/ticket.repository';
import { TicketService } from './ticket/ticket.service';
import { UserWhatsappTrackingService } from './user-whatsapp-tracking/user-whatsapp-tracking.service';
import { WebsocketGateway } from './websocket.gateway';
import { WhatsappController } from './whatsapp/whatsapp.controller';
import { WhatsappService } from './whatsapp/whatsapp.service';
import { SlackService } from './slack/slack.service';
import { ConsumerModule } from './consumer/consumer.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerService } from './scheduler/scheduler.service';
import { MacroService } from './macros/macros.service';
import { MacroRepository } from './macros/repository/macros.repository';
import { MacroController } from './macros/macros.controller';
import { CohortRepository } from './cohort/respository/cohort.respository';
import { GajniService } from './gajni/gajni.service';
import { AppSyncService } from './app-sync/app-sync.service';
import { FileParserService } from './file-parser/file-parser.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConsumerModule,
    ScheduleModule.forRoot(),
  ],

  controllers: [
    AppController,
    AgentController,
    AdminController,
    WhatsappController,
    NotionController,
    MacroController,
  ],
  providers: [
    AppService,
    AgentService,
    WebsocketGateway,
    CohortService,
    DatabaseService,
    AdminService,
    UserWhatsappTrackingService,
    TicketService,
    StorageService,
    ConsumerService,
    NotionService,
    SlackService,
    PrismaService,
    TicketRepository,
    WhatsappService,
    SchedulerService,
    MacroService,
    MacroRepository,
    CohortRepository,
    GajniService,
    AppSyncService,
    FileParserService,
  ],
})
export class AppModule {}

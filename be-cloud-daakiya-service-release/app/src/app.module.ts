import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { RegistrationService } from "./registration/registration.service";
import { RegistrationRepository } from "./registration/repository/registration.repository";
import { ConfigModule } from "@nestjs/config";
import { RegistrationController } from "./registration/registration.controller";
import { AppLogger } from "./app.logger";
import { CohortService } from "./cohort/cohort.service";
import { CohortController } from "./cohort/cohort.controller";
import { CohortRepository } from "./cohort/repository/cohort.repository";
import { PrismaService } from "./prisma-client/prisma.service";
import { NotificationService } from "./notification/notification.service";
import { FCMRepository } from "./notification/repository/fcm.repository";
import { NotificationController } from "./notification/notification.controller";
import { UserService } from "./user/user.service";
import { UserRepository } from "./user/repository/user.repository";
import { UserController } from './user/user.controller';
import { CampaignService } from './campaign/campaign.service';
import { CampaignController } from './campaign/campaign.controller';
import { CampaignRepository } from "./campaign/repository/campaign.repository";
import { NotificationRepository } from './notification/repository/notification.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, RegistrationController, CohortController, NotificationController, UserController, CampaignController],
  providers: [
    //core
    AppLogger,
    AppService,
    //registration
    RegistrationService,
    RegistrationRepository,
    //cohort
    CohortService,
    CohortRepository,
    //prisma
    PrismaService,
    //notification
    NotificationService,
    FCMRepository,
    //user
    UserService,
    UserRepository,
    //Campaign
    CampaignService,
    CampaignRepository,
    NotificationRepository,
  ],
})
export class AppModule { }

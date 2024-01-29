import {Body, Controller, Get, HttpException, Param, Post} from "@nestjs/common";
import {AppLogger} from "../app.logger";
import {NotificationService} from "./notification.service";
import {
    SendNotificationToCohortRequestDTO as SendNotificationToCohortRequestDTO
} from "./dto/send.notification.to.cohort.request.dto";
import {SendNotificationToCohortResponsetDTO} from "./dto/send.notification.to.cohort.response.dto";
import {SendNotificationToUserResponseDTO} from "./dto/send.notification.to.user.response.dto";
import {SendNotificationToUserRequestDTO} from "./dto/send.notification.to.user.request.dto";
import {SendNotificationToUsersRequestDTO} from "./dto/send.notification.to.users.request.dto";
import {SendNotificationToAllUsersRequestDTO} from "./dto/send.notification.to.all.users.request.dto";
import {UpdateNotificationStatusRequestDTO} from "./dto/update.notification.status.dto";

@Controller('notification')
export class NotificationController {
    constructor(
        private logger: AppLogger,
        private service: NotificationService,
    ) {
    }

    @Post('/cohort')
    async sendNotificationToCohort(
        @Body() request: SendNotificationToCohortRequestDTO,
    ): Promise<SendNotificationToCohortResponsetDTO> {
        try {
            await this.service.sendNotificationToCohortUsers(request.cohortID, {
                title: request.title,
                body: request.body,
            });
            return {success: true} as SendNotificationToCohortResponsetDTO;
        } catch (exception) {
            this.logger.error(exception);
            throw new HttpException(exception.message, 500);
        }
    }

    @Post('/user')
    async sendNotificationToUser(
        @Body() request: SendNotificationToUserRequestDTO,
    ): Promise<SendNotificationToUserResponseDTO> {
        try {
            await this.service.sendNotificationToUser(request.userID, {
                title: request.title,
                body: request.body,
                link: request.link,
            });
            return {success: true} as SendNotificationToUserResponseDTO;
        } catch (exception) {
            this.logger.error(exception);
            throw exception;
        }
    }

    @Post('/users')
    async sendNotificationToUsers(
        @Body() request: SendNotificationToUsersRequestDTO,
    ): Promise<SendNotificationToUserResponseDTO> {
        try {
            await this.service.sendNotificationToUsers(request.userIDs, {
                title: request.title,
                body: request.body,
                link: request.link
            });
            return {success: true} as SendNotificationToUserResponseDTO;
        } catch (exception) {
            this.logger.error(exception);
            throw exception;
        }
    }

    @Post('/users/all')
    async sendNotificationToAllUsers(
        @Body() request: SendNotificationToAllUsersRequestDTO,
    ): Promise<SendNotificationToUserResponseDTO> {
        try {
            await this.service.sendNotificationToAllUsers({
                title: request.title,
                body: request.body,
            });
            return {success: true} as SendNotificationToUserResponseDTO;
        } catch (exception) {
            this.logger.error(exception);
            throw exception;
        }
    }

    @Post('/update/status')
    async changeNotificationStatus(
        @Body() request: UpdateNotificationStatusRequestDTO,
    ) {
        try {
            await this.service.changeNotificationStatus(request);
            return {success: true};
        } catch (exception) {
            this.logger.error(exception);
            throw exception;
        }
    }

    @Get('/stats/:metaID')
    async getNotificationStats(@Param('metaID') metaID: string) {
        try {
            const stats = await this.service.getNotificationStats(
                metaID,
            );
            return stats;
        } catch (exception) {
            this.logger.error(exception);
            throw exception;
        }
    }
}

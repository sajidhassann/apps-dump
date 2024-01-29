import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Post,
    Put,
    UploadedFile,
    UseInterceptors
} from "@nestjs/common";
import {CreateCohortRequestDTO} from "./dto/create.cohort.request.dto";
import {CreateCohortResponseDTO as CohortResponseDTO} from "./dto/create.cohort.response.dto";
import {AppLogger} from "../app.logger";
import {CohortService} from "./cohort.service";
import {ListCohortUsersResponseDTO} from "./dto/list.cohort.user.response.dto";
import {ModifyCohortUsersResponseDTO} from "./dto/modify.cohort.users.response.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {MixpanelCohortImportRequestDTO} from "./dto/mixpanelCohortImportRequestDTO";
import {MixpanelImportResponseDTO} from "./dto/mixpanel.importer.response.dto";
import {MixpanelImportCohortModel} from "./models/mixpanel.import.cohort.model";
import {CohortUserReachableCountDTO} from "./dto/cohort.user.reachable.count.dto";

@Controller('cohort')
export class CohortController {
    constructor(
        private readonly logger: AppLogger,
        private readonly service: CohortService,
    ) {
    }

    @Post()
    async createCohort(
        @Body() request: CreateCohortRequestDTO,
    ): Promise<CohortResponseDTO> {
        try {
            return await this.service.createCohort(request.name);
        } catch (exception) {
            this.logger.error(exception);
            throw new HttpException(
                exception.message ?? 'Failed to create cohort',
                500,
            );
        }
    }

    @Get()
    async getCohorts(): Promise<CohortResponseDTO[]> {
        try {
            return await this.service.listCohorts();
        } catch (exception) {
            this.logger.error(exception);
            throw new HttpException(
                exception.message ?? 'Failed to get cohort users',
                500,
            );
        }
    }

    @Get('/:id')
    async getCohortUsers(
        @Param() params: { id: string },
    ): Promise<ListCohortUsersResponseDTO> {
        try {
            const users = await this.service.getCohortUsers(params.id);
            return {
                total: users.length,
                reachable: users.filter((user) => user.reachable).length,
                users,
            };
        } catch (exception) {
            this.logger.error(exception);
            throw new HttpException(
                exception.message ?? 'Failed to list cohort users',
                500,
            );
        }
    }

    @Get('count/:id')
    async getCohortUserReachableCount(
        @Param('id') cohortID: string,
    ): Promise<CohortUserReachableCountDTO> {
        try {
            return await this.service.getCohortUserReachableCount(cohortID);
        } catch (exception) {
            this.logger.error(exception);
            throw new HttpException(
                exception.message ?? 'Failed to list cohort users',
                500,
            );
        }
    }

    @Get('counts/:ids')
    async getCohortsUserReachableCount(
        @Param('ids') cohortIDs: string[],
    ): Promise<CohortUserReachableCountDTO> {
        try {
            return await this.service.getCohortsUserReachableCount(cohortIDs
                ? JSON.parse(cohortIDs?.toString())
                : []);
        } catch (exception) {
            this.logger.error(exception);
            throw new HttpException(
                exception.message ?? 'Failed to list cohort users',
                500,
            );
        }
    }

    @Patch('/:id')
    @UseInterceptors(FileInterceptor('file'))
    async addUsers(
        @Param() params: { id: string },
        @UploadedFile() file: Express.Multer.File,
    ): Promise<ModifyCohortUsersResponseDTO> {
        try {
            await this.service.bulkAddCohortUsersFromCSV(file, params.id);
            return {
                success: true,
            };
        } catch (exception) {
            this.logger.error(exception);
            throw new HttpException(
                exception.message ?? 'Failed to add cohort users',
                500,
            );
        }
    }

    @Put('/:id')
    @UseInterceptors(FileInterceptor('file'))
    async replaceCohortUsers(
        @Param() params: { id: string },
        @UploadedFile() file: Express.Multer.File,
    ): Promise<ModifyCohortUsersResponseDTO> {
        try {
            await this.service.bulkReplaceCohortUsersFromCSV(file, params.id);
            return {
                success: true,
            };
        } catch (exception) {
            this.logger.error(exception);
            throw new HttpException(
                exception.message ?? 'Failed to replace cohort users',
                500,
            );
        }
    }

    @Post('/mixpanel/import')
    async import(
        @Body() request: MixpanelCohortImportRequestDTO,
    ): Promise<MixpanelImportResponseDTO> {
        try {
            console.log(
                '!!!INFO : MIXPANEL IMPORT COHORT REQUEST',
                request.parameters.members.length,
            );
            await this.service.importCohortFromMixpanel(
                new MixpanelImportCohortModel(request),
            );
            return {
                action: request.action,
                status: 'success',
            };
        } catch (e) {
            console.log(
                '!!!ERROR : MIXPANEL IMPORT COHORT REQUEST',
                e?.toString?.()
            );
            throw new HttpException({
                action: request.action,
                status: 'failure',
                error: {
                    message: e?.toString?.(),
                    code: HttpStatus.BAD_REQUEST,
                },
            }, HttpStatus.BAD_REQUEST)
        }
    }
}


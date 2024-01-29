import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateCohortRequestDto } from './dto/create.cohort.request.dto';
import { AssignCohortRequestDto } from './dto/assign.cohort.request.dto';
import { Cohort, Prisma } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import CohortCallCsv from './dto/cohort.call.csv';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/create/cohort')
  createCohort(@Body() data: CreateCohortRequestDto): Promise<Cohort> {
    console.log('Hitting create cohort endpoint with data: ', data);

    return this.adminService.createCohort(data);
  }

  @Post('/create/cohort/many')
  createCohortMany(@Body() data: Prisma.CohortCreateManyInput[]) {
    console.log('Hitting create cohort endpoint with data: ', data);
    return this.adminService.createCohortMany(
      data as Prisma.CohortCreateManyInput[],
    );
  }

  @Post('/create/cohort/call/many')
  createCohortCallMany(@Body() data: Prisma.CohortCallCreateManyInput[]) {
    console.log('Hitting create cohort endpoint with data: ', data);
    return this.adminService.createCohortCallMany(
      data as Prisma.CohortCallCreateManyInput[],
    );
  }

  @Post('/assign/cohort')
  assignCohort(@Body() data: AssignCohortRequestDto) {
    console.log('Hitting assign cohort endpoint with data: ', data);

    return this.adminService.assignCohort(data);
  }

  @Post('/upload/csv/cohort-calls')
  @UseInterceptors(FileInterceptor('file'))
  async bulkInsertAgents(
    @UploadedFile() file: Express.Multer.File,
    @Body() request: CohortCallCsv,
  ) {
    return this.adminService.uploadCohortCallsFromCSV(file, request.cohortID);
  }
}

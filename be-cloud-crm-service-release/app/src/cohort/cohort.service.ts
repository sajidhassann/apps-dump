import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AssignCohortRequestDto } from 'src/admin/dto/assign.cohort.request.dto';
import { CreateCohortCallRequestDto } from 'src/admin/dto/create.cohort.call.request.dto';
import { CallStatus } from 'src/constants/enums/call.status.enum';
import { DatabaseService } from '../database/database.service';
import { CohortRepository } from './respository/cohort.respository';
import OffsetPagination from '../utils/pagination/offset.pagination';
import { Availability, Cohort, CohortCall, Prisma } from '@prisma/client';
import ListPaginatedCohortCall from './models/list.paginated.cohort.call';

@Injectable()
export class CohortService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly cohortRepository: CohortRepository,
  ) {}

  createCohort(data: Prisma.CohortCreateWithoutCallsInput): Promise<Cohort> {
    return this.cohortRepository.createCohort(data);
  }

  createCohortCallMany(data: Prisma.CohortCallCreateManyInput[]) {
    return this.cohortRepository.createCohortCallMany(data);
  }
  createCohortMany(data: Prisma.CohortCreateManyInput[]) {
    return this.cohortRepository.createManyCohort(data);
  }

  assignCohort(data: AssignCohortRequestDto) {
    return this.databaseService.assignCohort(data);
  }

  listCohorts() {
    return this.cohortRepository.listCohorts();
  }

  listActiveCohorts() {
    return this.cohortRepository.listCohortsByCriteria({
      availability: Availability.RELEASED,
    });
  }

  getCohortCallsByNumbersInLastThreeWeeks(numbers: string[]) {
    const threeWeekAgo = new Date();
    threeWeekAgo.setDate(threeWeekAgo.getDate() - 21);

    return this.cohortRepository.getCohortCallsByCriteria({
      number: {
        in: numbers,
      },
      createdAt: {
        gte: threeWeekAgo,
      },
    });
  }

  async listPaginatedCohortCall(payload: ListPaginatedCohortCall) {
    const {
      cohortID,
      agentEmail,
      date,
      interestStatus,
      pageNumber,
      pageSize,
      number,
      status,
      grade,
    } = payload;
    const searchCriteria: Prisma.CohortCallWhereInput = {
      agentID: agentEmail,
      cohortID,
      createdAt: {
        gte: date,
      },
      interestStatus,
      number,
      grade: {
        contains: grade,
      },
      status,
      availability: Availability.RELEASED,
    };
    console.log(
      '!!INFO: CohortService.listPaginatedCohortCall payload',
      payload,
    );
    try {
      const count = await this.cohortRepository.getCohortCallsCountByCriteria(
        searchCriteria,
      );
      console.log(
        '!!INFO: CohortService.listPaginatedCohortCall count' + count,
      );
      if (count === 0) {
        return new OffsetPagination<CohortCall>({
          count,
          pageSize,
          pageNumber,
          items: [],
        });
      }

      const skip = count - pageSize * pageNumber;

      const items = await this.cohortRepository.getCohortCallsByCriteria(
        searchCriteria,
        Math.max(skip, 0),
        pageSize + Math.min(0, skip),
      );

      items.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

      return new OffsetPagination<CohortCall>({
        count,
        pageSize,
        pageNumber,
        items,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async updateCohortCall(
    where: Prisma.CohortCallWhereUniqueInput,
    data: Prisma.CohortCallUpdateWithoutCohortInput,
  ): Promise<CohortCall> {
    return this.cohortRepository.updateCohortCall(where, data);
  }

  async updateCohortCallStatus(data: {
    callID: string;
    status: CallStatus;
    agent?: string;
  }): Promise<void> {
    const updatedCall = await this.cohortRepository.updateCohortCall(
      {
        id: data.callID,
      },
      { status: data.status, agentID: data.agent },
    );

    console.log('Post updating call: ', updatedCall);
  }

  async bulkUploadCohortCalls(data: CreateCohortCallRequestDto[]) {
    const createdCalls = data.map((obj) => {
      return this.databaseService.createCohortCall(obj);
    });

    return Promise.all(createdCalls);
  }

  // async getAgent(agentID: string): Promise<AgentDbModel> {
  //   const agent = await this.databaseService.getAgent(agentID);

  //   if (!agent) {
  //     throw new HttpException(
  //       { message: `Agent with ID = ${agentID} does not exist.` },
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }

  //   return agent;
  // }

  async createCohortCall(body: Prisma.CohortCallUncheckedCreateInput) {
    const callsData = await this.getCohortCallsByNumbersInLastThreeWeeks(
        [body.number],
    );
    
    if (callsData.length != 0) {
      console.log(`DUPLICATE: Cohort user with phone number ${body.number} in last three weeks record`)
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Cohort user with phone number ${body.number} in last three weeks record`,
        },
        HttpStatus.BAD_REQUEST,
       
      );
      
      
    }
    return this.cohortRepository.createCohortCall(body);
  }

  createCohortCallLog(body: Prisma.CohortCallLogUncheckedCreateInput) {
    return this.cohortRepository.createCohortCallLog(body);
  }
}

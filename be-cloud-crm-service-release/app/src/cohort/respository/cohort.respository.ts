import { Injectable } from '@nestjs/common';
import { Cohort, CohortCall, Prisma } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class CohortRepository {
  constructor(private prisma: PrismaService) {}

  createCohort(data: Prisma.CohortCreateWithoutCallsInput): Promise<Cohort> {
    return this.prisma.cohort.create({ data });
  }

  createManyCohort(data: Prisma.CohortCreateManyInput[]) {
    return this.prisma.cohort.createMany({ data });
  }

  createCohortCallMany(data: Prisma.CohortCallCreateManyInput[]) {
    return this.prisma.cohortCall.createMany({ data, skipDuplicates: true });
  }

  createCohortCall(data: Prisma.CohortCallUncheckedCreateInput) {
    console.log('Creating call with data: ', JSON.stringify(data));
    return this.prisma.cohortCall.create({ data });
  }

  createCohortCallLog(data: Prisma.CohortCallLogUncheckedCreateInput) {
    console.log('Creating call Log with data: ', JSON.stringify(data));
    return this.prisma.cohortCallLog.create({ data });
  }

  listCohorts() {
    return this.prisma.cohort.findMany();
  }

  listCohortsByCriteria(where: Prisma.CohortWhereInput) {
    return this.prisma.cohort.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  updateCohortCall(
    updateCriteria: Prisma.CohortWhereUniqueInput,
    data: Prisma.CohortCallUpdateWithoutCohortInput,
  ) {
    console.log('Updating call with data: ', JSON.stringify(data));
    return this.prisma.cohortCall.update({
      data: data,
      where: updateCriteria,
    });
  }

  async getCohortCallsByCriteria(
    searchCriteria: Prisma.CohortCallWhereInput,
    skip?: number,
    take?: number,
  ): Promise<CohortCall[]> {
    console.log(
      '!!INFO: CohortRepository.getCohortCallsByCriteria payload',
      searchCriteria,
    );
    return this.prisma.cohortCall.findMany({
      where: searchCriteria,
      skip,
      take,
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async getCohortCallsCountByCriteria(
    criteria: Prisma.CohortWhereInput,
  ): Promise<number> {
    return this.prisma.cohortCall.count({
      where: criteria,
    });
  }

  getCohort(id: string): Promise<Cohort> {
    return this.prisma.cohort.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  // getCohortCall(callID: string): Promise<CohortCall> {
  //   return this.cohortCallModel.get(callID);
  // }

  getCohortCall(id: string): Promise<CohortCall> {
    return this.prisma.cohortCall.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }
}

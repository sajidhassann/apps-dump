import { Injectable, Logger } from '@nestjs/common';
import { CohortService } from 'src/cohort/cohort.service';
import { AssignCohortRequestDto } from './dto/assign.cohort.request.dto';
import { CreateCohortRequestDto } from './dto/create.cohort.request.dto';
import { Cohort, Prisma } from '@prisma/client';
import { FileParserService } from '../file-parser/file-parser.service';

@Injectable()
export class AdminService {
  private logger = new Logger(AdminService.name);

  constructor(
    private readonly cohortService: CohortService,
    private readonly fileParserService: FileParserService,
  ) {}

  // MARK:- Create endpoints

  createCohort(data: CreateCohortRequestDto): Promise<Cohort> {
    return this.cohortService.createCohort(data);
  }

  createCohortCallMany(data: Prisma.CohortCallCreateManyInput[]) {
    return this.cohortService.createCohortCallMany(data);
  }

  createCohortMany(data: Prisma.CohortCreateManyInput[]) {
    return this.cohortService.createCohortMany(data);
  }

  // MARK: Assign Cohort Agent

  assignCohort(data: AssignCohortRequestDto) {
    return this.cohortService.assignCohort(data);
  }

  async uploadCohortCallsFromCSV(file: Express.Multer.File, cohortID: string) {
    const data = await this.fileParserService.csv2JSON(file);

    console.log('CSV DATA JSON', JSON.stringify(data));

    const callNumbers = data.map((c) => c.$phone.replace(/^92/, '+92'));

    const callsData =
      await this.cohortService.getCohortCallsByNumbersInLastThreeWeeks(
        callNumbers,
      );

    const numbersInLastThreeWeeks = callsData.reduce(
      (m: Record<string, boolean>, c) => {
        m[c.number] = true;
        return m;
      },
      {},
    );

    const calls = data
      .filter(
        (item) => !numbersInLastThreeWeeks[item.$phone.replace(/^92/, '+92')],
      )
      .map((item) => {
        const number = item.$phone.replace(/^92/, '+92');
        // const id = item.$distinct_id || undefined;

        const [fName = '', lName = ''] =
          item.$name && item.$name !== 'undefined'
            ? item.$name.split?.(' ')
            : [];

        const grade =
          item.grade && item.grade !== 'undefined' ? item.grade : undefined;

        return {
          // id,
          number,
          fName,
          lName,
          cohortID,
          grade,
        } as Prisma.CohortCallCreateManyInput;
      });

    return this.cohortService.createCohortCallMany(calls);
  }

  // bulkUploadCohortCalls(data: any[], cohortID: string) {
  //   const transformedCalls = data.map((obj) => {
  //     const newObj: CreateCohortCallRequestDto = {
  //       cohortID,
  //       fName:
  //         obj['$name']?.trim()?.split(' ')?.[0] === ''
  //           ? 'No Name'
  //           : obj['$name']?.trim()?.split(' ')?.[0],
  //       lName:
  //         obj['$name']?.trim()?.split(' ')?.[1] === ''
  //           ? 'No Name'
  //           : obj['$name']?.trim()?.split(' ')?.slice(1)?.join(' '),
  //       number: `+${obj['$phone']}`,
  //       phoneType: PhoneType.SHARED,
  //       status: CallStatus.PENDING,
  //       board: 'Sindh Board',
  //       isTuition: false,
  //       subjects: [''],
  //       notes: '',
  //       availability: Availability.RELEASED,
  //     };

  //     return newObj;
  //   });

  //   // console.log('transformedCalls = ', transformedCalls);
  //   // return
  //   return this.cohortService.bulkUploadCohortCalls(transformedCalls);
  // }
}

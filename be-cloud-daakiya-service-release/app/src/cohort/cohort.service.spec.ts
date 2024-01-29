import { Test, TestingModule } from "@nestjs/testing";
import { CohortService } from "./cohort.service";
import { CohortRepository } from "./repository/cohort.repository";
import { ConfigService } from "@nestjs/config";
import { Cohort, CohortUser, Prisma } from "@prisma/client";
import { PrismaService } from "../prisma-client/prisma.service";
import { Readable } from "node:stream";
import { MixpanelImportCohortModel } from "./models/mixpanel.import.cohort.model";
import { MixpanelUser } from "./models/mixpanelUser";

describe('CohortService', () => {
  let service: CohortService;
  let repository: CohortRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CohortService,
        CohortRepository,
        ConfigService,
        PrismaService,
      ],
    }).compile();

    service = module.get<CohortService>(CohortService);
    repository = module.get<CohortRepository>(CohortRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('createCohort', () => {
    it('should create a new cohort with name with cohort id that will be uuid', async () => {
      jest
        .spyOn(repository, 'createCohort')
        .mockImplementation((name: string) =>
          Promise.resolve({
            id: '123',
            name,
          } as Cohort),
        );
      const mockCohortName = 'test';
      const cohort = await service.createCohort(mockCohortName);
      expect(cohort.name).toBe(mockCohortName);
    });
  });

  describe('listCohorts', () => {
    it('should return all cohorts', async () => {
      const result = [
        {
          id: '123',
          name: 'test',
        },
        {
          id: '456',
          name: 'test2',
        },
      ];
      jest
        .spyOn(repository, 'listCohorts')
        .mockImplementation(() => Promise.resolve(result as Cohort[]));
      const cohorts = await service.listCohorts();
      expect(cohorts).toHaveLength(result.length);
    });
  });

  describe('listCohortUserIds', () => {
    it('should return the all the cohort cohort user in it', async () => {
      const userIDs = ['id1', 'id2', 'id3', 'id4', 'id5'];
      const cohortID = '123';
      const cohortUsersResult = [
        {
          id: `${cohortID}-${userIDs[0]}`,
          userID: userIDs[0],
          cohortID: cohortID,
        },
        {
          id: `${cohortID}-${userIDs[1]}`,
          userID: userIDs[1],
          cohortID: cohortID,
        },
      ];
      jest
        .spyOn(repository, 'getCohortUserIds')
        .mockImplementation((cohortID: string) =>
          Promise.resolve(cohortUsersResult as CohortUser[]),
        );
      const cohorts = await service.getCohortUserIds(cohortID);
      expect(cohorts).toHaveLength(cohortUsersResult.length);
      expect(cohorts).toContain(cohortUsersResult[0].userID);
      expect(cohorts).toContain(cohortUsersResult[1].userID);
    });
  });

  describe('replaceCohortUsers', () => {
    const mockFile: Express.Multer.File = {
      fieldname: 'file',
      originalname: 'test.csv',
      encoding: '7bit',
      mimetype: 'text/csv',
      size: 1,
      buffer: Buffer.from('user_id\nid3\nid4\nid5'),
      destination: 'uploads/',
      filename: 'test.csv',
      path: 'uploads/test.csv',
      stream: Readable.from('user_id\nid3\nid4\nid5'),
    };

    it('should remove the cohort users that are already in cohort and add the new users', async () => {
      const userIDs = ['id1', 'id2', 'id3', 'id4', 'id5'];
      const cohortID = '123';
      const cohortUsersResult = [
        {
          id: `${cohortID}-${userIDs[0]}`,
          userID: userIDs[0],
          cohortID: cohortID,
        },
        {
          id: `${cohortID}-${userIDs[1]}`,
          userID: userIDs[1],
          cohortID: cohortID,
        },
      ];
      jest
        .spyOn(repository, 'getCohortUserIds')
        .mockImplementation((cohortID: string) =>
          Promise.resolve(cohortUsersResult as CohortUser[]),
        );
      jest
        .spyOn(repository, 'removeCohortUsers')
        .mockImplementation((cohortID: string, userIDs: string[]) =>
          Promise.resolve(true),
        );
      jest
        .spyOn(repository, 'addCohortUsers')
        .mockImplementation((cohortID: string, userIDs: MixpanelUser[]) =>
          ({} as Prisma.PrismaPromise<Prisma.BatchPayload> ),
        );

      jest
        .spyOn(repository, 'createUsersIfNotExists')
        .mockImplementation((userIDs: MixpanelUser[]) => ({} as Promise<Prisma.BatchPayload>));

      const cohorts = await service.bulkReplaceCohortUsersFromCSV(
        mockFile,
        cohortID,
      );
      expect(cohorts).toBe(true);
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('importCohortFromMixpanel', () => {
    const userIDs = ['id1', 'id2', 'id3', 'id4', 'id5'];
    const cohortID = '123';
    const cohortName = 'test';
    it('should create the cohort if doesnot exists', async () => {
      const action = 'members';
      const data: MixpanelImportCohortModel = {
        action,
        cohortID,
        cohortName,
        mixpanelUsers: userIDs.map((id) => ({ id })),
      };
      const createCohortIfNotExistsSpy = jest
        .spyOn(repository, 'createCohortIfNotExists')
        .mockImplementation((data) =>
          Promise.resolve({ id: cohortID, name: cohortName } as Cohort),
        );
      
      jest
        .spyOn(repository, 'createUsersIfNotExists')
        .mockImplementation((mixpanelUsers) => ({} as Promise<Prisma.BatchPayload>));

      jest
        .spyOn(repository, 'addCohortUsers')
        .mockImplementation((cohortID: string, userIDs: MixpanelUser[]) =>
          ({} as Prisma.PrismaPromise<Prisma.BatchPayload> ),
        );
      

      await service.importCohortFromMixpanel(data);
      
      expect(createCohortIfNotExistsSpy).toHaveBeenCalledTimes(1);
    });
    it('should create user if they donot exists if action is members', async () => {
      const action = 'members';
      const data: MixpanelImportCohortModel = {
        action,
        cohortID,
        cohortName,
        mixpanelUsers: userIDs.map((id) => ({ id })),
      };


      const createUsersIfNotExistsSpy = jest
        .spyOn(repository, 'createUsersIfNotExists')
        .mockImplementation((userIDs: MixpanelUser[]) => ({} as Promise<Prisma.BatchPayload>));


      const createAddCohoerUsersSpy =  jest
        .spyOn(repository, 'addCohortUsers')
        .mockImplementation((cohortID: string, userIDs: MixpanelUser[]) =>
          ({} as Prisma.PrismaPromise<Prisma.BatchPayload> ),
        );
      
      jest
        .spyOn(repository, 'createCohortIfNotExists')
        .mockImplementation((data) =>
          Promise.resolve({ id: cohortID, name: cohortName } as Cohort),
        );

      await service.importCohortFromMixpanel(data);

      expect(createUsersIfNotExistsSpy).toHaveBeenCalledTimes(1);
      expect(createAddCohoerUsersSpy).toHaveBeenCalledTimes(1);
    });

    it('should create user if they donot exists if action is add_members', async () => {
      const action = 'add_members';
      const data: MixpanelImportCohortModel = {
        action,
        cohortID,
        cohortName,
        mixpanelUsers: userIDs.map((id) => ({ id })),
      };

      const createUsersIfNotExistsSpy = jest
        .spyOn(repository, 'createUsersIfNotExists')
        .mockImplementation((userIDs: MixpanelUser[]) => ({} as Promise<Prisma.BatchPayload>));

      const createAddCohoerUsersSpy = jest
        .spyOn(repository, 'addCohortUsers')
        .mockImplementation((cohortID: string, userIDs: MixpanelUser[]) =>
          ({} as Prisma.PrismaPromise<Prisma.BatchPayload> ),
        );

      const createCohortIfNotExistsSpy = jest
        .spyOn(repository, 'createCohortIfNotExists')
        .mockImplementation((data) =>
          Promise.resolve({ id: cohortID, name: cohortName } as Cohort),
        );

      await service.importCohortFromMixpanel(data);

      expect(createUsersIfNotExistsSpy).toHaveBeenCalledTimes(1);
      expect(createAddCohoerUsersSpy).toHaveBeenCalledTimes(1);
    });

    it('should not create users if action is remove_members', async () => {
      const action = 'remove_members';
      const data: MixpanelImportCohortModel = {
        action,
        cohortID,
        cohortName,
        mixpanelUsers: userIDs.map((id) => ({ id })),
      };

      const createUsersIfNotExistsSpy = jest
        .spyOn(repository, 'createUsersIfNotExists')
        .mockImplementation((userIDs: MixpanelUser[]) => ({} as Promise<Prisma.BatchPayload>));

      const createAddCohoerUsersSpy = jest
        .spyOn(repository, 'addCohortUsers')
        .mockImplementation((cohortID: string, userIDs: MixpanelUser[]) =>
          ({} as Prisma.PrismaPromise<Prisma.BatchPayload> ),
        );

      const createCohortIfNotExistsSpy = jest
        .spyOn(repository, 'createCohortIfNotExists')
        .mockImplementation((data) =>
          Promise.resolve({ id: cohortID, name: cohortName } as Cohort),
        );

      await service.importCohortFromMixpanel(data);

      expect(createUsersIfNotExistsSpy).toHaveBeenCalledTimes(0);
      expect(createAddCohoerUsersSpy).toHaveBeenCalledTimes(0);
    });
  });

});

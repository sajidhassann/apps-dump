import { ProcessingService } from './processing.service';
import { TestBed } from '@automock/jest';
import { RepositoryService } from '../repository/repository.service';
import { Ferozi } from '../models/ferozi.model';
import { TrinoService } from '../../trino/trino/trino.service';
import { QueryData } from 'trino-client';
import { UserFerozi, UserFeroziStatus } from '../models/user.ferozi.model';
import { ConsumerService } from '../../consumer/consumer.service';
import { ConfigService } from '@nestjs/config/dist/config.service';

describe('ProcessingService', () => {
  let service: ProcessingService;
  let trino: TrinoService;
  let repository: RepositoryService;

  beforeEach(() => {
    jest.clearAllMocks();

    const { unit, unitRef } = TestBed.create(ProcessingService)
      .mock(TrinoService)
      .using({})
      .mock(RepositoryService)
      .using({})
      .mock(ConsumerService)
      .using({})
      .mock(ConfigService)
      .using({})
      .compile();

    service = unit;
    trino = unitRef.get(TrinoService);
    repository = unitRef.get(RepositoryService);
  });

  describe('Process Ferozi', () => {
    it('Should run and validate query', async () => {
      const runAndValidateSpy = jest
        .spyOn(service, 'runAndValidateQuery')
        .mockImplementation(async () => [
          'user-id-1',
        ]);
      await service.processUserFerozis(
        {
          id: '123',
          name: 'test',
          sqlQuery: 'SELECT * FROM test',
          isActive: true,
          nature: 'PESSIMISTIC',
          passPercentage: 50,
        } as Ferozi,
        100,
      );

      expect(runAndValidateSpy).toHaveBeenCalledTimes(1);
    });
    it('Should transform User IDs to be SAMPLE and Unacknowledged Ferozis', async () => {
      jest
        .spyOn(trino, 'runTrinoQuery')
        .mockImplementation(
          async () =>
            [
              ['8349c3bb-66ba-41b0-8c93-38ca282d735a'],
              [null],
              [null],
            ] as QueryData[],
        );
      
      const result = await service.processUserFerozis(
        {
          id: '123',
          name: 'test',
          sqlQuery: 'SELECT * FROM test',
          isActive: true,
          nature: 'PESSIMISTIC',
          passPercentage: 50,
        } as Ferozi,
        100,
      );
      expect(result[0].status).toBe(UserFeroziStatus.SAMPLE);
      expect(result[0].acknowledged).toBe(false);
      expect(result).toHaveLength(1);
    });
    it('Should batch create user ferozis', async () => {
      jest
        .spyOn(service, 'batchInsertUserFerozis')
        .mockImplementation(async () => []);
      jest
        .spyOn(service, 'runAndValidateQuery')
        .mockImplementation(async () => [
          'user-id-1',
        ]);

      await service.processUserFerozis(
        {
          id: '123',
          name: 'test',
          sqlQuery: 'SELECT * FROM test',
          isActive: true,
          nature: 'PESSIMISTIC',
          passPercentage: 50,
        } as Ferozi,
        100,
      );

      expect(service.batchInsertUserFerozis).toHaveBeenCalledTimes(1);
    });
  });

  describe('Batch create user ferozis', () => {
    it('Should create user ferozis in the given number of batches', async () => {
      let mockUserFeroziList: UserFerozi[] = [];
      for (let i = 0; i < 101; i++) {
        mockUserFeroziList.push({
          feroziID: 'feroziID',
          userID: 'userID',
          status: UserFeroziStatus.SAMPLE,
          acknowledged: false,
        } as UserFerozi);
      }

      const insertedData = await service.batchInsertUserFerozis(
        mockUserFeroziList,
        10,
      );

      expect(repository.createUserFerozisIfNotExsist).toHaveBeenCalledTimes(11);
      expect(insertedData.length).toBe(101);
    });
  });
  

  describe('Run & Validate Query', () => {
    it('Should run trino query', async () => {
      jest
        .spyOn(trino, 'runTrinoQuery')
        .mockImplementation(async (sqlQuery) => [] as QueryData[]);
      jest
        .spyOn(service, 'validateQueryData')
        .mockImplementation(() => [] as string[]);

      await service.runAndValidateQuery('SELECT * FROM test');
      expect(trino.runTrinoQuery).toBeCalledWith('SELECT * FROM test');
    });

    it('Should validate query data', async () => {
      const trinoSpy = jest
        .spyOn(trino, 'runTrinoQuery')
        .mockImplementation(async () => [] as QueryData[]);
      const validateSpy = jest
        .spyOn(service, 'validateQueryData')
        .mockImplementation(() => [] as string[]);

      await service.runAndValidateQuery('SELECT * FROM test');
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Validate Query Data', () => {

    it('Should extract first column of the data and treat it as userIDs', async () => {
      jest
        .spyOn(trino, 'runTrinoQuery')
        .mockImplementation(
          async () =>
            [
              [
                '8349c3bb-66ba-41b0-8c93-38ca282d735a',
                'some-other-data',
              ],
            ] as QueryData[],
        );
      const result = await service.runAndValidateQuery('SELECT * FROM test');
      expect(result).toHaveLength(1);
      expect(result[0]).toBe('8349c3bb-66ba-41b0-8c93-38ca282d735a');
    });

    it('Should remove user IDs and treat them as one', async () => {
      jest
        .spyOn(trino, 'runTrinoQuery')
        .mockImplementation(
          async () =>
            [
              ['8349c3bb-66ba-41b0-8c93-38ca282d735a'],
              ['8349c3bb-66ba-41b0-8c93-38ca282d735a'],
              ['8349c3bb-66ba-41b0-8c93-38ca282d735a'],
            ] as QueryData[],
        );
      const result = await service.runAndValidateQuery('SELECT * FROM test');
      expect(result).toHaveLength(1);
    });

    it('Should throw an error if there are no users', async () => {
      jest
        .spyOn(trino, 'runTrinoQuery')
        .mockImplementation(async () => [] as QueryData[]);
      await expect(
        service.runAndValidateQuery('SELECT * FROM test'),
      ).rejects.toThrowError('No user IDs found');
    });
  });
});

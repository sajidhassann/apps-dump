import { TestBed } from '@automock/jest';
import { FeroziService } from './ferozi.service';
import { UserFeroziStatus, UserFerozi } from './models/user.ferozi.model';
import { RepositoryService } from './repository/repository.service';
import { UserFeroziEntity } from './repository/models/user.ferozi.entity';
import { TrinoService } from '../trino/trino/trino.service';
import { ConsumerService } from '../consumer/consumer.service';
import { FeroziEntity } from './repository/models/ferozi.entity';
import { Ferozi } from './models/ferozi.model';
import { FeroziNature, FeroziType } from '@prisma/client';
import { AnalyticsService } from './analytics/analytics.service';

describe('FeroziService', () => {
  let service: FeroziService;
  let repository: RepositoryService;
  let consumer: ConsumerService;
  let analytics: AnalyticsService;

  beforeAll(() => {
    jest.clearAllMocks();
    const { unit, unitRef } = TestBed.create(FeroziService)
      .mock(RepositoryService)
      .using({})
      .mock(ConsumerService)
      .using({})
      .mock(AnalyticsService)
      .using({})
      .compile();

    service = unit;
    repository = unitRef.get(RepositoryService);
    consumer = unitRef.get(ConsumerService);
    analytics = unitRef.get(AnalyticsService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  //spinUpFerozisForUser
  it('Should get all active experiments for given user id', async () => {
    const feroziEntinity = {
      id: 'feroziID',
      passPercentage: 100,
      sqlQuery: 'select * from users',
      isActive: true,
      maxCapacity: 100,
    } as FeroziEntity;
    const getUserFerozisByUserIDSpy = jest
      .spyOn(repository, 'getUserFerozisByUserID')
      .mockImplementation(async (userID) => {
        return [
          new UserFeroziEntity(
            'ferozi-id-1',
            '123',
            'CONTROL',
            feroziEntinity,
            false,
          ),
          new UserFeroziEntity(
            'ferozi-id-1',
            '123',
            'CONTROL',
            { ...feroziEntinity, isActive: false },
            false,
          ),
        ];
      });

    const getFeroziStatusCountSpy = jest
      .spyOn(analytics, 'getFeroziStats')
      .mockImplementation(async () => {
        return {
          acknowledgedControlCount: 0,
          acknowledgedTreatmentCount: 0,
          controlCount: 0,
          treatmentCount: 0,
          sampleCount: 0,
        };
      });

    const result = await service.spinUpFerozisForUser('123');

    expect(getUserFerozisByUserIDSpy).toHaveBeenCalled();
    expect(getUserFerozisByUserIDSpy).toHaveBeenCalledWith('123');
    expect(result).toHaveLength(1);
  });

  it('Should spin up the user to CONTROL if the pass percentage is 0', async () => {
    jest
      .spyOn(repository, 'getUserFerozisByUserID')
      .mockImplementation(async (userID) => {
        return [
          new UserFeroziEntity(
            'ferozi-id-1',
            '123',
            'SAMPLE',
            {
              id: 'ferozi-id-1',
              passPercentage: 0,
              sqlQuery: 'select * from users',
              isActive: true,
              maxCapacity: 100,
            } as FeroziEntity,
            false,
          ),
        ];
      });

    const result = await service.spinUpFerozisForUser('123');
    expect(result[0].status).toEqual(UserFeroziStatus.CONTROL);
  });

  it('Should spin up the user to TREATMENT if the pass percentage is 100', async () => {
    jest
      .spyOn(repository, 'getUserFerozisByUserID')
      .mockImplementation(async (userID) => {
        return [
          new UserFeroziEntity(
            'ferozi-id-1',
            '123',
            'SAMPLE',
            {
              id: 'ferozi-id-1',
              passPercentage: 100,
              sqlQuery: 'select * from users',
              isActive: true,
              maxCapacity: 100,
            } as FeroziEntity,
            false,
          ),
        ];
      });

    const result = await service.spinUpFerozisForUser('123');
    expect(result[0].status).toEqual(UserFeroziStatus.TREATMENT);
  });

  it('Should update the user if it has a status change', async () => {
    jest
      .spyOn(repository, 'getUserFerozisByUserID')
      .mockImplementation(async (userID) => {
        return [
          new UserFeroziEntity(
            'ferozi-id-1',
            '123',
            'SAMPLE',
            {
              id: 'ferozi-id-1',
              passPercentage: 50,
              sqlQuery: 'select * from users',
              isActive: true,
              maxCapacity: 100,
            } as FeroziEntity,
            false,
          ),
          new UserFeroziEntity(
            'ferozi-id-1',
            '123',
            'CONTROL',
            {
              id: 'ferozi-id-1',
              passPercentage: 50,
              sqlQuery: 'select * from users',
              isActive: true,
              maxCapacity: 100,
            } as FeroziEntity,
            false,
          ),
        ];
      });
    const updateSpy = jest.spyOn(repository, 'updateUserFerozi');

    await service.spinUpFerozisForUser('123');
    expect(updateSpy).toHaveBeenCalledTimes(1);
  });

  it('Should not spin up if the maximum capcity of the experiment exceeds', async () => {
    jest
      .spyOn(repository, 'getUserFerozisByUserID')
      .mockImplementation(async (userID) => {
        return [
          new UserFeroziEntity(
            'ferozi-id-1',
            '123',
            'SAMPLE',
            {
              id: 'ferozi-id-1',
              passPercentage: 50,
              sqlQuery: 'select * from users',
              isActive: true,
              maxCapacity: 100,
              nature: FeroziNature.PESSIMISTIC,
            } as FeroziEntity,
            false,
          ),
        ];
      });

    jest.spyOn(analytics, 'getCurrentCapacity').mockImplementation(() => {
      return 101;
    });

    const result = await service.spinUpFerozisForUser('123');
    expect(result).toHaveLength(0);
  });

  it('Should return ferozi for treatment and control users when maximum capcity of the experiment exceeds', async () => {
    jest
      .spyOn(repository, 'getUserFerozisByUserID')
      .mockImplementation(async (userID) => {
        return [
          new UserFeroziEntity(
            'ferozi-id-1',
            '123',
            'TREATMENT',
            {
              id: 'ferozi-id-1',
              passPercentage: 50,
              sqlQuery: 'select * from users',
              isActive: true,
              maxCapacity: 100,
              nature: FeroziNature.PESSIMISTIC,
            } as FeroziEntity,
            false,
          ),
          new UserFeroziEntity(
            'ferozi-id-1',
            '123',
            'CONTROL',
            {
              id: 'ferozi-id-1',
              passPercentage: 50,
              sqlQuery: 'select * from users',
              isActive: true,
              maxCapacity: 100,
              nature: FeroziNature.PESSIMISTIC,
            } as FeroziEntity,
            false,
          ),
        ];
      });

    jest.spyOn(analytics, 'getCurrentCapacity').mockImplementation(() => {
      return 101;
    });

    const result = await service.spinUpFerozisForUser('123');
    expect(result).toHaveLength(2);
  });

  it('Should spin up if current capcity is less than max capcity', async () => {
    jest
      .spyOn(repository, 'getUserFerozisByUserID')
      .mockImplementation(async (userID) => {
        return [
          new UserFeroziEntity(
            'ferozi-id-1',
            '123',
            'SAMPLE',
            {
              id: 'ferozi-id-1',
              passPercentage: 50,
              sqlQuery: 'select * from users',
              isActive: true,
              maxCapacity: 60,
              nature: FeroziNature.OPTIMISTIC,
            } as FeroziEntity,
            false,
          ),
        ];
      });

    jest.spyOn(analytics, 'getCurrentCapacity').mockImplementation(() => {
      return 59;
    });

    const result = await service.spinUpFerozisForUser('123');
    expect(result).toHaveLength(1);
  });

  //runKurandazi
  it('Should schedule all queries for all active experiments ', async () => {
    jest.spyOn(repository, 'getActiveFerozi').mockImplementation(async () => {
      return [
        {
          id: '123',
          passPercentage: 20,
          sqlQuery: 'select * from users',
          isActive: true,
          maxCapacity: 100,
        },
        {
          id: '123',
          passPercentage: 20,
          sqlQuery: 'select * from users',
          isActive: false,
          maxCapacity: 100,
        },
      ] as unknown as FeroziEntity[];
    });

    await service.runKurandazi();
    expect(consumer.produce).toHaveBeenCalledTimes(1);
  });

  it('Should add ferozi on create', async () => {
    const ferozi = new Ferozi(
      '123',
      'Test',
      20,
      'select * from users',
      true,
      100,
      FeroziType.INAPP_POPUP,
      FeroziNature.OPTIMISTIC,
    );
    const createSpy = jest
      .spyOn(repository, 'createFerozi')
      .mockImplementation(async (data) => {
        return data;
      });

    await service.createFerozi(ferozi);

    expect(createSpy).toHaveBeenCalledWith(ferozi);
  });

  it('Should schedule trino query on creation of ferozi', async () => {
    const ferozi = new Ferozi(
      '123',
      'Test',
      20,
      'select * from users',
      true,
      100,
      FeroziType.INAPP_POPUP,
      FeroziNature.OPTIMISTIC,
    );
    await service.createFerozi(ferozi);

    expect(consumer.produce).toHaveBeenCalledTimes(1);
  });

  it('Should get all ferzoi', async () => {
    const ferozies = [new FeroziEntity(), new FeroziEntity()];
    jest.spyOn(repository, 'getAllFerozis').mockImplementation(async () => {
      return ferozies;
    });

    const result = await service.getAllFerozis();

    expect(result).toEqual(ferozies);
  });

  it('Should update ferozi', async () => {
    const ferozi = new Ferozi(
      '123',
      'Test',
      20,
      'select * from users',
      true,
      100,
      FeroziType.INAPP_POPUP,
      FeroziNature.OPTIMISTIC,
    );

    jest.spyOn(repository, 'updateFerozi').mockImplementation(async () => {
      return ferozi;
    });

    const result = await service.updateFerozi(ferozi);

    expect(result).toEqual(ferozi);
  });

  it('Should schedule trino query on updation of ferozi ', async () => {
    const ferozi = new Ferozi(
      '123',
      'Test',
      20,
      'select * from users',
      true,
      100,
      FeroziType.INAPP_POPUP,
      FeroziNature.OPTIMISTIC,
    );
    await service.updateFerozi(ferozi);

    expect(consumer.produce).toHaveBeenCalledTimes(1);
  });

  it('Should add a user ID to given experiment ID as SAMPLE', async () => {
    const feroziID = '123';
    const userID = 'user_123';

    const createUserFeroziSpy = jest
      .spyOn(repository, 'createUserFerozi')
      .mockImplementation(async () => {
        return new UserFeroziEntity(feroziID, userID, UserFeroziStatus.SAMPLE);
      });

    await service.addUserToFerozi(feroziID, userID);

    expect(createUserFeroziSpy).toHaveBeenCalledWith(
      feroziID,
      userID,
      UserFeroziStatus.SAMPLE,
    );
  });

  it('Should change user status to discard', async () => {
    const feroziID = '123';
    const userID = 'user_123';
    const updateUserFerozi = jest.spyOn(repository, 'updateUserFerozi');

    await service.discardUserFerozi(userID, feroziID);

    expect(updateUserFerozi).toHaveBeenCalledWith({
      userID,
      feroziID,
      status: UserFeroziStatus.DISCARD,
    });
  });

  it('Should mark ferozi user as acknowledged', async () => {
    const feroziID = '123';
    const userID = 'user_123';
    const status = UserFeroziStatus.CONTROL;
    const acknowledged = true;

    const updateUserFeroziSpy = jest
      .spyOn(repository, 'updateUserFerozi')
      .mockImplementation(async () => {
        return new UserFeroziEntity(
          feroziID,
          userID,
          status,
          undefined,
          acknowledged,
        );
      });

    await service.acknowledgeUserFerozi(userID, feroziID);

    expect(updateUserFeroziSpy).toHaveBeenCalledWith({
      feroziID,
      userID,
      acknowledged,
    });
  });

  it('Should delete ferozi', async () => {
    const feroziID = '123';
    const deleteFeroziSpy = jest.spyOn(repository, 'deleteFerozi');

    await service.deleteFerozi(feroziID);

    expect(deleteFeroziSpy).toHaveBeenCalledWith(feroziID);
  });
});

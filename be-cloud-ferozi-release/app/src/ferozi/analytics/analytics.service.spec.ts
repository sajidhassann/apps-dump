import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticsService } from './analytics.service';
import { RepositoryService } from '../repository/repository.service';
import { UserFeroziStatus } from '../models/user.ferozi.model';
import { TestBed } from '@automock/jest';
import { Ferozi } from '../models/ferozi.model';
import { FeroziStat } from '../models/ferozi.stat.mode';
import { FeroziNature, FeroziType } from '@prisma/client';

describe('AnalyticsService', () => {
  let service: AnalyticsService;
  let repository: RepositoryService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const { unit, unitRef } = TestBed.create(AnalyticsService)
      .mock(RepositoryService)
      .using({})
      .compile();

    service = unit;
    repository = unitRef.get(RepositoryService);
  });

  describe('Get Ferozi Analutics', () => {
    it('Should Get Ferozi Stat', async () => {
      const getFeroziStatsSpy = jest
        .spyOn(service, 'getFeroziStats')
        .mockImplementation(async () => {
          return new FeroziStat();
        });
      await service.getFeroziAnalytics({} as Ferozi);
      expect(getFeroziStatsSpy).toHaveBeenCalledTimes(1);
    });
    it('Should Calculate Maximum Capcity', async () => {
      const ferozi = {
        nature: FeroziNature.PESSIMISTIC,
      } as Ferozi;

      const currentCapcitySpy = jest
        .spyOn(service, 'getCurrentCapacity')
        .mockImplementation(() => 10);
      await service.getFeroziAnalytics(ferozi);
      expect(currentCapcitySpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Get Ferozi Stat', () => {
    it('Should get stats for given ferozi', async () => {
      const feroziID = '123';
      const getFeroziAnalyticsSpy = jest
        .spyOn(repository, 'getFeroziStatusCount')
        .mockImplementation(async () => {
          return {
            [UserFeroziStatus.SAMPLE]: {
              acknowledged: 0,
              total: 1000,
            },
            [UserFeroziStatus.CONTROL]: {
              acknowledged: 20,
              total: 50,
            },
            [UserFeroziStatus.TREATMENT]: {
              acknowledged: 40,
              total: 60,
            },
            [UserFeroziStatus.DISCARD]: {
              acknowledged: 0,
              total: 0,
            },
          };
        });
      const result = await service.getFeroziStats(feroziID);
      expect(result.acknowledgedControlCount).toBe(20);
      expect(result.acknowledgedTreatmentCount).toBe(40);
      expect(result.treatmentCount).toBe(60);
      expect(result.controlCount).toBe(50);
      expect(result.sampleCount).toBe(1000);
    });
  });

  describe('Get Current Capcity', () => {
    it('Should return total count for PESSIMISTIC ferozi as COUNT(TREATMENT) + COUNT(CONTROL)', () => {
      const ferozi = {
        nature: FeroziNature.PESSIMISTIC,
      } as Ferozi;
      const feroziStat = {
        treatmentCount: 10,
        controlCount: 20,
        acknowledgedControlCount: 0,
        acknowledgedTreatmentCount: 0,
      } as FeroziStat;
      const result = service.getCurrentCapacity(ferozi, feroziStat);
      expect(result).toBe(30);
    });
    it('Should return total count for OPTIMISTIC ferozi as TOTAL ACKNOWLGMENTS', () => {
      const ferozi = {
        nature: FeroziNature.OPTIMISTIC,
      } as Ferozi;
      const feroziStat = {
        treatmentCount: 10,
        controlCount: 20,
        acknowledgedControlCount: 10,
        acknowledgedTreatmentCount: 10,
      } as FeroziStat;
      const result = service.getCurrentCapacity(ferozi, feroziStat);
      console.log(result);
      expect(result).toBe(20);
    });
  });
});

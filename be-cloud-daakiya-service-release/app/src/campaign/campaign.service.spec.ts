import {Test, TestingModule} from '@nestjs/testing';
import {CampaignService} from './campaign.service';
import {CampaignRepository} from './repository/campaign.repository';
import {Campaign, CampaignStatus as PrismaCampaignStatus, Prisma} from '@prisma/client';
import {Campaign as ModelCampaign, CampaignStatus} from './models/campaign';
import {PrismaService} from '../prisma-client/prisma.service';
import {CohortService} from '../cohort/cohort.service';
import {CohortRepository} from '../cohort/repository/cohort.repository';
import {CampaignWithData} from './repository/models/campaign.with.data';

describe('CampaignService', () => {
  let service: CampaignService;
  let repository: CampaignRepository;
  let cohortService: CohortService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CampaignService,
        CampaignRepository,
        PrismaService,
        CohortService,
        CohortRepository,

      ],
    }).compile();

    service = module.get<CampaignService>(CampaignService);
    repository = module.get<CampaignRepository>(CampaignRepository);
    cohortService = module.get<CohortService>(CohortService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createCampaign', () => {
    it('should store a campaign in initiated state with notification meta', async () => {
      jest
        .spyOn(repository, 'initiateCampaign')
        .mockImplementation((data: Prisma.CampaignCreateInput) =>
          Promise.resolve({
            id: '1',
            name: data.name,
            notificationMetaID: '1',
            status: PrismaCampaignStatus.INITIATED,
            createdAt: new Date(),
            updatedAt: new Date(),
          } as Campaign),
        );
      const campaign = await service.initiateCampaign({
        name: 'Test Campaign',
        campaignCohortIDs: ['1', '2'],
        notificationMeta: {
          title: 'Test Title',
          body: 'Test Body',
        },
      });
      expect(campaign.status).toEqual(CampaignStatus.INITIATED);
    });
  });

  describe('changeCampaignStatus', () => {
    it('should change the given status of campaign', async () => {
      const updateCampaignSpy = jest
        .spyOn(repository, 'updateCampaign')
        .mockImplementation(
          (
            data: Prisma.CampaignUpdateInput,
            where: Prisma.CampaignWhereUniqueInput,
          ) =>
            Promise.resolve({
              id: '1',
              name: data.name,
              campaignCohorts: ['1', '2'],
              notificationMetaID: '1',
              status: PrismaCampaignStatus.CREATION_IN_PROGRESS,
              createdAt: new Date(),
              updatedAt: new Date(),
            } as Campaign),
        );

      await service.changeCampaignStatus(
        '1',
        CampaignStatus.CREATION_IN_PROGRESS,
      );

      expect(updateCampaignSpy).toHaveBeenCalledWith(
        {
          status: PrismaCampaignStatus.CREATION_IN_PROGRESS,
        },
        {
          id: '1',
        },
      );
    });
  });

  describe('listCampaign', () => {
    it('should retrive and return a list of campaigns in paginated way', async () => {
      const campaigns = [
        {
          id: '1',
          name: 'Test Campaign',
          notificationMeta: {
            id: '1',
            title: 'Test Title',
            body: 'Test Body',
            link: 'Test Link',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          notificationMetaID: '1',
          status: PrismaCampaignStatus.CREATION_IN_PROGRESS,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'Test Campaign 2',
          notificationMeta: {
            id: '2',
            title: 'Test Title',
            body: 'Test Body',
            link: 'Test Link',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          notificationMetaID: '2',
          status: PrismaCampaignStatus.CREATION_IN_PROGRESS,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest
        .spyOn(repository, 'listCampaigns')
        .mockImplementation((criteria: Prisma.CampaignWhereInput, offset: number, limit: number) => Promise.resolve(campaigns));
      jest
        .spyOn(repository, 'getTotalCampaignCount')
        .mockImplementation(() => Promise.resolve(2));

      const result = await service.listCampaigns(
        {
          pageSize: 10,
          pageNumber: 1,
        }
      );

      const mappedCampaigns = campaigns.map((campaign) => {
        return new ModelCampaign({
          ...campaign,
          status: campaign.status as CampaignStatus,
        });
      });

      expect(result).toEqual({
        count: 2,
        items: mappedCampaigns,
        pageNumber: 1,
        pageSize: 10,
        totalPages: 1,
      });
    });
    it('should get campaign count and divide it in pages', async () => {
      const campaigns = [
        {
          id: '1',
          name: 'Test Campaign',
          notificationMeta: {
            id: '1',
            title: 'Test Title',
            body: 'Test Body',
            link: 'Test Link',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          notificationMetaID: '1',
          status: PrismaCampaignStatus.CREATION_IN_PROGRESS,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'Test Campaign 2',
          notificationMeta: {
            id: '2',
            title: 'Test Title',
            body: 'Test Body',
            link: 'Test Link',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          notificationMetaID: '2',
          status: PrismaCampaignStatus.CREATION_IN_PROGRESS,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest
        .spyOn(repository, 'listCampaigns')
        .mockResolvedValue(campaigns)

      const countSpy = jest.spyOn(repository, 'getTotalCampaignCount').mockImplementation(() => Promise.resolve(2));

      const result = await service.listCampaigns(
        {
          pageSize: 10,
          pageNumber: 1,
        }
      );

      const mappedCampaigns = campaigns.map((campaign) => {
        return new ModelCampaign({
          ...campaign,
          status: campaign.status as CampaignStatus,
        });
      });

      expect(countSpy).toHaveBeenCalled();

    });
  });


  describe('getCampaign', () => {
    it('should return a campaign with given id', async () => {
      const getCampaignSpy = jest.spyOn(repository, 'getCampaign').mockImplementation(
        (id: string) => Promise.resolve(
          {
            "id": "7418240f-b752-47e7-a962-561c5dcafa0e",
            "name": "Test Campaign",
            "notificationMetaID": "67f892c2-cd30-499a-b228-12206b4176e0",
            "status": "SENDING_COMPLETE",
            "createdAt": new Date("2023-10-03T06:12:11.391Z"),
            "updatedAt": new Date("2023-10-03T06:12:11.391Z"),
            "campaignCohorts": [
              {
                "cohort": {
                  "id": "537b568c-0aec-4f7a-a5d7-f506ae53ab6f",
                  "name": "go-service-test-cohort",
                  "createdAt": new Date("2023-10-03T06:12:11.391Z"),
                  "updatedAt": new Date("2023-10-03T06:12:11.391Z")
                }
              }
            ],
            "notificationMeta": {
              "id": "67f892c2-cd30-499a-b228-12206b4176e0",
              "title": "This is a title",
              "body": "This is a body",
              "link": null,
              "createdAt": new Date("2023-10-03T06:12:11.391Z"),
              "updatedAt": new Date("2023-10-03T06:12:11.391Z")
            }
          } as CampaignWithData
        ));
      const result = await service.getCampaign('1');
      expect(getCampaignSpy).toHaveBeenCalledTimes(1)
    })
  });

  describe('restartCampaign', () => {
    it('should return a restart campaign with given id', async () => {
      const getCampaignSpy = jest.spyOn(repository, 'getCampaign').mockImplementation(
        (id: string) => Promise.resolve(
          {
            "id": id,
            "name": "Test Campaign",
            "notificationMetaID": "67f892c2-cd30-499a-b228-12206b4176e0",
            "status": "SENDING_COMPLETE",
            "createdAt": new Date("2023-10-03T06:12:11.391Z"),
            "updatedAt": new Date("2023-10-03T06:12:11.391Z"),
            "campaignCohorts": [
              {
                "cohort": {
                  "id": "537b568c-0aec-4f7a-a5d7-f506ae53ab6f",
                  "name": "go-service-test-cohort",
                  "createdAt": new Date("2023-10-03T06:12:11.391Z"),
                  "updatedAt": new Date("2023-10-03T06:12:11.391Z")
                }
              }
            ],
            "notificationMeta": {
              "id": "67f892c2-cd30-499a-b228-12206b4176e0",
              "title": "This is a title",
              "body": "This is a body",
              "link": null,
              "createdAt": new Date("2023-10-03T06:12:11.391Z"),
              "updatedAt": new Date("2023-10-03T06:12:11.391Z")
            }
          } as CampaignWithData
        ));

      const updateCampaignSpy = jest
          .spyOn(repository, 'updateCampaign')
          .mockImplementation(
              (
                  data: Prisma.CampaignUpdateInput,
                  where: Prisma.CampaignWhereUniqueInput,
              ) =>
                  Promise.resolve({
                    id: '1',
                    name: data.name,
                    campaignCohorts: ['1', '2'],
                    notificationMetaID: '1',
                    status: PrismaCampaignStatus.CREATION_IN_PROGRESS,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  } as Campaign),
          );

      const result = await service.restartCampaign('1');
      expect(result).toBeDefined()
    })

    it('should not return a restart campaign with given id', async () => {
      const getCampaignSpy = jest.spyOn(repository, 'getCampaign').mockImplementation(
        (id: string) => Promise.resolve(
          {
            "id": id,
            "name": "Test Campaign",
            "notificationMetaID": "67f892c2-cd30-499a-b228-12206b4176e0",
            "status": "SENDING_IN_PROGRESS",
            "createdAt": new Date("2023-10-03T06:12:11.391Z"),
            "updatedAt": new Date("2023-10-03T06:12:11.391Z"),
            "campaignCohorts": [
              {
                "cohort": {
                  "id": "537b568c-0aec-4f7a-a5d7-f506ae53ab6f",
                  "name": "go-service-test-cohort",
                  "createdAt": new Date("2023-10-03T06:12:11.391Z"),
                  "updatedAt": new Date("2023-10-03T06:12:11.391Z")
                }
              }
            ],
            "notificationMeta": {
              "id": "67f892c2-cd30-499a-b228-12206b4176e0",
              "title": "This is a title",
              "body": "This is a body",
              "link": null,
              "createdAt": new Date("2023-10-03T06:12:11.391Z"),
              "updatedAt": new Date("2023-10-03T06:12:11.391Z")
            }
          } as CampaignWithData
        ));

      const updateCampaignSpy = jest
          .spyOn(repository, 'updateCampaign')
          .mockImplementation(
              (
                  data: Prisma.CampaignUpdateInput,
                  where: Prisma.CampaignWhereUniqueInput,
              ) =>
                  Promise.resolve({
                    id: '1',
                    name: data.name,
                    campaignCohorts: ['1', '2'],
                    notificationMetaID: '1',
                    status: PrismaCampaignStatus.CREATION_IN_PROGRESS,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  } as Campaign),
          );

      const result = await service.restartCampaign('1');
      expect(result).toBeUndefined()
    })
  });
});


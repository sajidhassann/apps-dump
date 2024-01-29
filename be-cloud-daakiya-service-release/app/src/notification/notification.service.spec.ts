import {Test, TestingModule} from "@nestjs/testing";
import {NotificationService} from "./notification.service";
import {CohortService} from "../cohort/cohort.service";
import {RegistrationService} from "../registration/registration.service";
import {RegistrationRepository} from "../registration/repository/registration.repository";
import {CohortRepository} from "../cohort/repository/cohort.repository";
import {PrismaService} from "../prisma-client/prisma.service";
import {NotificationStatus as PrismaNotificationStatus, Token} from "@prisma/client";
import {FCMRepository} from "./repository/fcm.repository";
import {Notification} from "./models/notification";
import {AppLogger} from "../app.logger";
import {NOTIFICATION_BATCH_SIZE} from "./notification.constants";
import {ConfigService} from "@nestjs/config";
import {UserService} from "../user/user.service";
import {UserRepository} from "../user/repository/user.repository";
import {NotificationStatus} from "./models/notification.status";

import {NotificationRepository} from "./repository/notification.repository";
import {NotificationStat} from "./repository/models/notification.stat";

describe('NotificationService', () => {
    let service: NotificationService;
    let cohortService: CohortService;
    let registrationService: RegistrationService;
    let repository: NotificationRepository;
    let fcmRepository: FCMRepository;
    let spyCohortService: jest.SpyInstance;
    let spyRegistrationService: jest.SpyInstance;
    let spyFCMRepository: jest.SpyInstance;

    const cohortID = 'test-cohort-id';
    const userIDs: string[] = [];
    const userTokens: Token[] = [];
    const noOfUsers = 5;
    for (let i = 0; i < noOfUsers; i++) {
        userIDs.push(`test-user-id-${i}`);
        userTokens.push({
            userID: userIDs[i],
            token: `test-token-${i}`,
        } as Token);
    }
    const notification: Notification = {
        title: 'Test Notification',
        body: 'This is a test notification',
    };
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                NotificationService,
                FCMRepository,
                RegistrationService,
                RegistrationRepository,
                CohortService,
                CohortRepository,
                PrismaService,
                AppLogger,
                ConfigService,
                UserService,
                UserRepository,
                NotificationRepository,
            ],
        }).compile();
        service = module.get<NotificationService>(NotificationService);
        cohortService = module.get<CohortService>(CohortService);
        registrationService = module.get<RegistrationService>(RegistrationService);
        fcmRepository = module.get<FCMRepository>(FCMRepository);
        repository = module.get<NotificationRepository>(NotificationRepository);

        spyCohortService = jest
            .spyOn(cohortService, 'getCohortUserIds')
            .mockImplementation(() => Promise.resolve(userIDs));
        spyRegistrationService = jest
            .spyOn(registrationService, 'getTokensForUsers')
            .mockImplementation((userIDs) =>
                Promise.resolve(
                    userTokens.filter((token) =>
                        userIDs.includes(token.userID as string),
                    ),
                ),
            );
        spyFCMRepository = jest
            .spyOn(fcmRepository, 'sendNotificationToTokens')
            .mockImplementation((tokens, notification) => {
                return Promise.resolve();
            });

    });

    afterEach(() => {
        jest.resetAllMocks();
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('sendNotificationToUsers', () => {
        it('should get tokens for all users against userIDs', async () => {
            await service.sendNotificationToUsers(userIDs, notification);
            expect(spyRegistrationService).toHaveBeenCalledWith(userIDs);
            expect(spyRegistrationService).toHaveBeenCalledTimes(1);
        });
    })
    describe('sendNotificationToCohortUsers', () => {
        it('should get all user ids in the cohort', async () => {
            await service.sendNotificationToCohortUsers(cohortID, notification);
            expect(spyCohortService).toHaveBeenCalledWith(cohortID);
            expect(spyCohortService).toHaveBeenCalledTimes(1);
        });
        it('should get tokens for all cohort users against cohort id', async () => {
            await service.sendNotificationToCohortUsers(cohortID, notification);
            expect(spyRegistrationService).toHaveBeenCalledWith(userIDs);
            expect(spyRegistrationService).toHaveBeenCalledTimes(1);
        });
        it('should throw an error if userIDs length is 0', async () => {
            spyCohortService.mockResolvedValue([]);
            await expect(
                service.sendNotificationToCohortUsers(cohortID, notification),
            ).rejects.toThrow('No users in cohort');
        });
        it('should throw an error if userTokens length is 0', async () => {
            spyRegistrationService.mockResolvedValue([]);
            await expect(
                service.sendNotificationToCohortUsers(cohortID, notification),
            ).rejects.toThrow('No tokens for users');
        });
        it('should send notifications in batches of NOTIFICATION_BATCH_SIZE', async () => {
            await service.sendNotificationToCohortUsers(cohortID, notification);
            const expectedCalls = Math.ceil(
                userTokens.length / NOTIFICATION_BATCH_SIZE,
            );
            expect(spyFCMRepository).toHaveBeenCalledTimes(expectedCalls);
        });
    });

    describe('sendNotificationToUser', () => {
        it('should get tokens for given user', async () => {

            await service.sendNotificationToUser(userIDs[0], notification);

            expect(spyRegistrationService).toHaveBeenCalledWith([userIDs[0]]);
            expect(spyRegistrationService).toHaveBeenCalledTimes(1);

            expect(spyFCMRepository).toHaveBeenCalledWith(
                [userTokens[0].token],
                notification,
            );
            expect(spyFCMRepository).toHaveBeenCalledTimes(1);

            expect(spyCohortService).not.toHaveBeenCalled();
        });
        it('should throw an error if userTokens length is 0', async () => {
                spyRegistrationService.mockResolvedValue([]);
                await expect(
                    service.sendNotificationToUser(userIDs[0], notification),
                ).rejects.toThrow('No tokens for users');
            }
        );
    });

    describe('changeNotificationStatus', () => {
        it('should update the notification status', async () => {
            const spyNotificationRepository = jest.spyOn(repository, 'updateNotifications').mockImplementation(
                (data, where) => Promise.resolve(
                    {count: 1}
                )
            );
            await service.changeNotificationStatus({
                    id: '1',
                    status: NotificationStatus.RECEIVED,
                    fcmMessageID: ''
                }
            );

            expect(spyNotificationRepository).toHaveBeenCalledWith(
                {
                    status: PrismaNotificationStatus.RECEIVED,
                },
                {
                    id: '1',
                }
            );
        });

    });

    describe('getNotificationStats', () => {
        it('should get notification stats', async () => {

            const data = [
                {
                    count: 2,
                    status: "FAILED",
                    status_code: 0
                },
                {
                    count: 1,
                    status: "SENT",
                    status_code: 1
                },
                {
                    count: 2,
                    status: "RECEIVED",
                    status_code: 2
                },
                {
                    count: 3,
                    status: "OPEN",
                    status_code: 3
                }
            ] as NotificationStat[]


            const spyNotificationRepository = jest
                .spyOn(repository, 'getNotificationsStats')
                .mockImplementation((metaID: string) => Promise.resolve(data));

            const result = await service.getNotificationStats('test-meta-id');
            expect(spyNotificationRepository).toHaveBeenCalledWith('test-meta-id');
            expect(spyNotificationRepository).toHaveBeenCalledTimes(1);


        });

        it('should return accurate notification stats', async () => {

            const data = [
                {
                    count: 2,
                    status: "FAILED",
                    status_code: 0
                },
                {
                    count: 1,
                    status: "SENT",
                    status_code: 1
                },
                {
                    count: 2,
                    status: "RECEIVED",
                    status_code: 2
                },
                {
                    count: 3,
                    status: "OPEN",
                    status_code: 3
                }
            ] as NotificationStat[]


            const spyNotificationRepository = jest
                .spyOn(repository, 'getNotificationsStats')
                .mockImplementation((metaID: string) => Promise.resolve(data));

            const result = await service.getNotificationStats('test-meta-id');

            expect(result.totalUsers).toEqual(8)
            expect(result.totalFailed).toEqual(2)
            expect(result.totalDelivered).toEqual(6)
            expect(result.totalReceived).toEqual(2)
            expect(result.totalOpened).toEqual(3)
            expect(result.totalFailedPercentage).toEqual('25.00')
            expect(result.totalDeliveredPercentage).toEqual('75.00')
            expect(result.totalReceivedPercentage).toEqual('25.00')
            expect(result.totalOpenedPercentage).toEqual('37.50')


        });
    });

});





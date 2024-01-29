import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {ConfigKeys} from '../config/app.configuration';
import {UserGradeGroupIds} from '../constants/user.grade.group.ids';
import {Service} from './models/service.enum';
import {UserBoardIds} from 'src/constants/user.board.ids';
import {Availability} from './enums/availability.enum';
import {AppConfig} from './models/app.config';

@Injectable()
export class AppConfigService {
    private envName: string;

    constructor(private readonly config: ConfigService) {
        this.envName = this.config.get(ConfigKeys.ENV_NAME);
    }

    isDoubtQueryAvailable(): boolean {
        const dateInRange = (start: Date, end: Date) => {
            const date = new Date();
            const pakistanTime = new Date(
                date.toLocaleString('en-US', {timeZone: 'Asia/Karachi'}),
            );
            const currentDateTime = pakistanTime;

            // console.log('UNAVAILABLE START DATE', dateToString(eidStartDate));
            // console.log('UNAVAILABLE END DATE', dateToString(eidEndDate));
            // console.log('CURRENT DATE', dateToString(currentDateTime));

            const inRange = currentDateTime >= start && currentDateTime <= end;
            // console.log('NOT AVAILABLE', inRange);
            return inRange;
        };

        function dateToString(date: Date) {
            const options: Intl.DateTimeFormatOptions = {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
            };
            return date.toLocaleDateString('en-PK', options);
        }

        // Note: Month starts from 0
        // format: Year, Month, Day, Hour, Minute, Second
        const eidStartDate = new Date(2023, 5, 28, 0, 0, 0);
        const eidEndDate = new Date(2023, 6, 2, 9, 0, 0);

        return !dateInRange(eidStartDate, eidEndDate);
    }

    applyProbablity(probability: number): boolean {
        return Math.random() < probability;
    }

    getConfig(): AppConfig {
        const config = {
            [Service.APP_SEARCH]: {
                values: {enabled: false},
                updated: Date.now(),
            },
            [Service.REFERRAL]: {
                values: {enabled: true},
                updated: Date.now(),
            },
            [Service.TESTS]: {
                values: {enabled: true},
                updated: Date.now(),
            },
            [Service.DIAGNOSTIC_TESTS]: {
                values: {
                    userGradeGroups:
                        this.envName === 'release'
                            ? UserGradeGroupIds.live
                            : UserGradeGroupIds.dev,
                },
                updated: Date.now(),
            },
            [Service.COURSE_JOURNEY]: {
                values: {
                    userBoardIds:
                        this.envName === 'release' ? UserBoardIds.live : UserBoardIds.dev,
                },
                updated: Date.now(),
            },
            [Service.VIDEO_ON_DEMAND]: {
                values: {download: {enabled: true}},
                updated: Date.now(),
            },
            [Service.PAYMENTS]: {
                values: {openLink: {enabled: true}},
                updated: Date.now(),
            },
            [Service.SPIN_THE_WHEEL]: {
                values: {enabled: true},
                updated: Date.now(),
            },
            [Service.ANALYTICS_SERVICE]: {
                values: {enabled: true},
                updated: Date.now(),
            },
            [Service.DOUBT_QUERY]: {
                values: {available: this.isDoubtQueryAvailable()},
                updated: Date.now(),
            },
            [Service.UPGRADE_USER_PRODUCTS]: {
                values: {enabled: true},
                updated: Date.now(),
            },
            [Service.NOTES]: {
                values: {
                    availablity: Availability.RELEASED,
                    enabled: true,
                    enabledIDs: [
                        "4421d477-c1ff-44a6-b339-ea0b4de4cd4e-8117b979-d30e-449e-bfcf-d4e904655af8",
                        "d485e873-d8de-47d0-bd2a-d34807339de4-8117b979-d30e-449e-bfcf-d4e904655af8",
                        "3b46d9cc-2568-404d-9d76-b9bfe535e7f3-8117b979-d30e-449e-bfcf-d4e904655af8",
                        "29356482-d436-48a9-8112-4cd5f2b3f6f7-8117b979-d30e-449e-bfcf-d4e904655af8"
                    ]
                },
                updated: Date.now()
            },
            [Service.LIVES]: {
                values: {
                    availablity: Availability.RELEASED,
                    enabled: true,
                    enabledIDs: [
                        "4421d477-c1ff-44a6-b339-ea0b4de4cd4e-8117b979-d30e-449e-bfcf-d4e904655af8",
                        "d485e873-d8de-47d0-bd2a-d34807339de4-8117b979-d30e-449e-bfcf-d4e904655af8",
                        "3b46d9cc-2568-404d-9d76-b9bfe535e7f3-8117b979-d30e-449e-bfcf-d4e904655af8",
                        "29356482-d436-48a9-8112-4cd5f2b3f6f7-8117b979-d30e-449e-bfcf-d4e904655af8"
                    ]
                },
                updated: Date.now()
            },
            [Service.PARTIAL_COURSE_JOURNEY]: {
                values: {
                    availablity: Availability.RELEASED,
                    enabled: true,
                    enabledIDs: [
                        "d485e873-d8de-47d0-bd2a-d34807339de4-6284aff0-c454-433e-8455-88ac6d37a12f",
                        "29356482-d436-48a9-8112-4cd5f2b3f6f7-6284aff0-c454-433e-8455-88ac6d37a12f"
                    ]
                },
                updated: Date.now()
            },
            [Service.AI_DOUBT_QUERY]: {
                values: {
                    enabled: true,
                },
                updated: Date.now(),
            },
            [Service.DOWNLOAD]: {
                values: {
                    enabled: true,
                    limit: 10,
                },
                updated: Date.now(),
            },
            [Service.ONBOARDING]: {
                values: {
                    // enabled: this.applyProbablity(1),
                    enabled: false,
                },
                updated: Date.now(),
            },
        };
        return new AppConfig(config);
    }
}

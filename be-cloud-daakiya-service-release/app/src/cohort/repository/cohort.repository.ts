import {Injectable} from "@nestjs/common";
import {Cohort, CohortUser, Prisma, Token, User} from "@prisma/client";
import {PrismaService} from "../../prisma-client/prisma.service";
import {MixpanelUser} from "../models/mixpanelUser";


type UserWithTokens = User & { tokens: Token[] };
type CountResult = [{ count: number }]

@Injectable()
export class CohortRepository {
    constructor(private readonly prisma: PrismaService) {
    }

    createCohort(name: string): Promise<Cohort> {
        return this.prisma.cohort.create({
            data: {
                name,
            },
        });
    }

    listCohorts(): Promise<Cohort[]> {
        return this.prisma.cohort.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    //TODO: Reafctor and remove the usage in notification.service.ts too.
    async getCohortUserIds(cohortID: string): Promise<CohortUser[]> {
        const cohort = await this.prisma.cohort.findUniqueOrThrow({
            where: {
                id: cohortID,
            },
            include: {
                users: true,
            },
        });
        return cohort.users;
    }

    getCohortUsersWithTokens(cohortID: string): Promise<UserWithTokens[]> {
        return this.prisma.user.findMany({
            include: {
                tokens: true,
            },
            where: {
                cohorts: {
                    some: {
                        cohortID,
                    },
                },
            },
        });
    }

    getCohortUsersCount(cohortID: string) {
        return this.prisma.cohortUser.count({where: {cohortID}})
    }

    getCohortsUsersCount(cohortIDs: string[]) {
        return this.prisma.$queryRawUnsafe<CountResult>(`SELECT CAST (COUNT(DISTINCT user_id) AS INTEGER) AS count FROM cohort_user cu WHERE cohort_id in (${cohortIDs.map((_,i)=>`$${i+1}`).join(',')})`, ...cohortIDs)
    }

    getCohortUsersCountWithTokens(cohortID: string) {
        return this.prisma.cohortUser.count({where: {cohortID, user: {NOT: {tokens: {none: {}}}}}})
    }


    getCohortsUsersCountWithTokens(cohortIDs: string[]) {
        return this.prisma.$queryRawUnsafe<CountResult>(`SELECT CAST (COUNT(DISTINCT cu.user_id) AS INTEGER) AS count FROM cohort_user cu INNER JOIN token t on cu.user_id = t.user_id where cohort_id in (${cohortIDs.map((_,i)=>`$${i+1}`).join(',')})`, ...cohortIDs)
    }

    addCohortUsers(cohortID: string, users: MixpanelUser[]) {
        const data = users.map((user) => ({
            cohortID: cohortID,
            userID: user.id,
        }));
        return this.prisma.cohortUser.createMany({
            data,
            skipDuplicates: true,
        });
    }

    async removeCohortUsers(
        cohortID: string,
        userIDs: string[],
    ): Promise<boolean> {
        await this.prisma.cohortUser.deleteMany({
            where: {
                cohortID,
                userID: {in: userIDs},
            },
        });
        return true;
    }

    async createUsersIfNotExists(data: MixpanelUser[]) {
        return this.prisma.user.createMany({
            data: data,
            skipDuplicates: true,
        });
    }

    createCohortIfNotExists(
        cohort: Prisma.CohortUncheckedCreateInput,
    ): Promise<Cohort> {
        return this.prisma.cohort.upsert({
            where: {
                id: cohort.id as string,
            },
            create: cohort,
            update: {},
        });
    }
}

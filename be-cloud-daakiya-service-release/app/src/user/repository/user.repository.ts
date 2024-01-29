import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma-client/prisma.service";

type CountResult = [{count: number}]

@Injectable()
export class UserRepository {

  constructor(private readonly prisma: PrismaService) {
  }

  getUsersWithTokens(): Promise<{userID: string | null}[]> {
    return this.prisma.token.findMany({
      select: { userID: true },
      distinct: ["userID"],
      where: {
        userID: {
          not: null
        }
      }
    });
  }

  getUsersWithTokensCount(): Promise<CountResult> {
    return this.prisma.$queryRaw`SELECT CAST (COUNT(DISTINCT user_id) AS INTEGER) AS count FROM token WHERE user_id IS NOT NULL`
  }
}
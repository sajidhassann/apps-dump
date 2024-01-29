import { Injectable } from '@nestjs/common';
import { UserToken } from '../models/user.token.model';
import { PrismaService } from '../../prisma-client/prisma.service';
import { Token, User } from '@prisma/client';

@Injectable()
export class RegistrationRepository {
  constructor(private readonly prisma: PrismaService) { }

  private getUserTokens(userID: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id: userID },
    });
  }

  private createUser(userID: string): Promise<User> {
    return this.prisma.user.create({
      data: {
        id: userID,
      },
    });
  }

  private updateUserWithToken(
    token: string,
    userID: string | null,
  ): Promise<any> {
    return this.prisma.token.upsert({
      where: { token },
      create: { token, userID },
      update: { userID }
    });
  }

  async registerToken(userToken: UserToken): Promise<boolean> {
    if (userToken.userID) {
      const user = await this.getUserTokens(userToken.userID);

      if (!user) {
        await this.createUser(userToken.userID);
      }
    }
    await this.updateUserWithToken(userToken.token, userToken.userID);
    return true;
  }

  async getTokensForUsers(userIDs: string[]): Promise<Token[]> {
    const tokens = this.prisma.token.findMany({
      where: {
        userID: {
          in: userIDs,
        },
      },
    });
    return tokens;
  }
}

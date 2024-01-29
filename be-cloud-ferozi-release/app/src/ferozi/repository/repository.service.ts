import { Injectable } from '@nestjs/common';
import { UserFeroziEntity } from './models/user.ferozi.entity';
import { FeroziEntity } from './models/ferozi.entity';
import { PrismaService } from '../prisma/prisma.service';
import { FeroziType, UserFeroziStatus } from '@prisma/client';
import { FeroziStatEntinty } from './models/ferozi.stats.entity';

@Injectable()
export class RepositoryService {
  constructor(private readonly prisma: PrismaService) {}

  async createFerozi(ferozi: FeroziEntity): Promise<FeroziEntity> {
    return this.prisma.ferozi.create({
      data: { ...ferozi },
    });
  }

  getFerozi(feroziID: string) {
    return this.prisma.ferozi.findUnique({
      where: {
        id: feroziID,
      },
    });
  }

  async getActiveFerozi(): Promise<FeroziEntity[]> {
    return this.prisma.ferozi.findMany({
      where: {
        isActive: true,
      },
    });
  }

  async getUserFerozisByUserID(userID: string): Promise<UserFeroziEntity[]> {
    return this.prisma.userFerozi.findMany({
      where: {
        userID,
      },
      include: {
        ferozi: true,
      },
    });
  }

  async getFeroziStatusCount(
    feroziID: string,
  ): Promise<Record<UserFeroziStatus, FeroziStatEntinty>> {
    const data = await this.prisma.userFerozi.groupBy({
      by: ['status', 'acknowledged'],
      _count: {
        _all: true,
      },
      where: {
        feroziID,
      },
    });

    const result: Record<UserFeroziStatus, FeroziStatEntinty> = {
      [UserFeroziStatus.SAMPLE]: new FeroziStatEntinty(),
      [UserFeroziStatus.TREATMENT]: new FeroziStatEntinty(),
      [UserFeroziStatus.CONTROL]: new FeroziStatEntinty(),
      [UserFeroziStatus.DISCARD]: new FeroziStatEntinty(),
    };

    for (const { status, acknowledged, _count } of data) {
      const userStatus = status as UserFeroziStatus;
      const count = _count._all;
      result[userStatus].total += count;
      if (acknowledged) {
        result[userStatus].acknowledged += count;
      }
    }

    return result;
  }

  async getUserFerozisByFeroziID(
    feroziID: string,
  ): Promise<UserFeroziEntity[]> {
    return this.prisma.userFerozi.findMany({
      where: {
        feroziID,
      },
    });
  }

  async updateUserFerozi(
    userFerozi: Partial<UserFeroziEntity>,
  ): Promise<UserFeroziEntity> {
    return this.prisma.userFerozi.update({
      where: {
        feroziID_userID: {
          feroziID: userFerozi?.feroziID,
          userID: userFerozi?.userID,
        },
      },
      data: {
        status: userFerozi.status as UserFeroziStatus,
        acknowledged: userFerozi.acknowledged,
      },
    });
  }

  async createUserFerozisIfNotExsist(
    userFerozi: UserFeroziEntity[],
  ): Promise<UserFeroziEntity[]> {
    const mapped = userFerozi.map((ferozi) => {
      return {
        feroziID: ferozi.feroziID,
        userID: ferozi.userID,
        status: ferozi.status as UserFeroziStatus,
      };
    });

    await this.prisma.userFerozi.createMany({
      data: mapped,
      skipDuplicates: true,
    });

    return userFerozi;
  }

  getAllFerozis(): Promise<FeroziEntity[]> {
    return this.prisma.ferozi.findMany();
  }

  async getActiveFeroziByID(feroziID: string): Promise<FeroziEntity> {
    const data = await this.prisma.ferozi.findUnique({
      where: {
        id: feroziID,
        isActive: true,
      },
    });
    return data;
  }

  createUserFerozi(
    userID: string,
    feroziID: string,
    status: UserFeroziStatus,
  ): Promise<UserFeroziEntity> {
    return this.prisma.userFerozi.create({
      data: {
        userID,
        feroziID,
        status,
      },
    });
  }

  updateFerozi(ferozi: Partial<FeroziEntity>): Promise<FeroziEntity> {
    return this.prisma.ferozi.update({
      where: {
        id: ferozi.id,
      },
      data: {
        ...ferozi,
      },
    });
  }

  async deleteFerozi(feroziID: string): Promise<FeroziEntity> {
    await this.prisma.userFerozi.deleteMany({
      where: {
        feroziID: feroziID,
      },
    });
    return this.prisma.ferozi.delete({
      where: {
        id: feroziID,
      },
    });
  }
}

import {Injectable} from '@nestjs/common';
import {Campaign, NotificationMeta, Prisma} from '@prisma/client';
import {PrismaService} from '../../prisma-client/prisma.service';
import {CampaignWithData} from './models/campaign.with.data';

@Injectable()
export class CampaignRepository {
  constructor(private readonly prisma: PrismaService) { }

  initiateCampaign(data: Prisma.CampaignCreateInput): Promise<Campaign> {
    return this.prisma.campaign.create({
      data,
    });
  }

  updateCampaign(
    data: Prisma.CampaignUpdateInput,
    where: Prisma.CampaignWhereUniqueInput,
  ): Promise<Campaign> {
    return this.prisma.campaign.update({
      data,
      where,
    });
  }

  createNotification(data: Prisma.NotificationCreateManyInput) {
    return this.prisma.notification.createMany({
      data,
    });
  }

  getTotalCampaignCount(): Promise<number> {
    return this.prisma.campaign.count();
  }

  listCampaigns(
    criteria: Prisma.CampaignWhereInput,
    skip: number,
    take: number,
  ): Promise<({ notificationMeta: NotificationMeta } & Campaign)[]> {
    return this.prisma.campaign.findMany({
      include: {
        notificationMeta: true,
      },
      where: criteria,
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take,
    });
  }

  async getCampaign(id: string): Promise<CampaignWithData> {
    return this.prisma.campaign.findUnique({
      where: {
        id,
      },
      include: {
        campaignCohorts: {
          select: {
            cohort: true,
          },
        },
        notificationMeta: true,
      },
    });
  }
}


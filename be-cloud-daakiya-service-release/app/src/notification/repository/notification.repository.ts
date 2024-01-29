import {Injectable} from '@nestjs/common';
import {Prisma} from '@prisma/client';
import {PrismaService} from '../../prisma-client/prisma.service';
import {NotificationStat} from "./models/notification.stat";

@Injectable()
export class NotificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  getNotificationsStats(metaID: string): Promise<NotificationStat[]> {
    return this.prisma.$queryRaw<NotificationStat[]>`
        WITH StatusMapping(status, rank) AS (
          VALUES 
          ('FAILED', 0),
          ('SENT', 1),
          ('RECEIVED', 2),
          ('OPEN', 3)
        ),
        StatusRank AS (
          SELECT
            n.user_id,
            max(s.rank) as status_code
          FROM notification n
          LEFT JOIN StatusMapping s ON n.status::text = s.status
          WHERE n.meta_id = ${metaID}
          group by user_id 
        )
        SELECT 
          CAST (COUNT(*) AS INTEGER) AS count,
          s.status,
          m.status_code
        FROM StatusRank m
        LEFT JOIN StatusMapping s ON m.status_code = s.rank
        GROUP BY 2,3
        ORDER BY 3
`;
  }

  async updateNotifications(
    data: Prisma.NotificationUpdateInput,
    where: Prisma.NotificationWhereInput,
  ) {
    return this.prisma.notification.updateMany({
      data,
      where,
    });
  }

  async createNotificationMeta(data: Prisma.NotificationMetaCreateInput) {
    return this.prisma.notificationMeta.create({
      data,
    });
  }

  createNotifications(
    data: Prisma.NotificationCreateManyInput[],
  ): Promise<Prisma.BatchPayload> {
    return this.prisma.notification.createMany({
      data,
    });
  }
}

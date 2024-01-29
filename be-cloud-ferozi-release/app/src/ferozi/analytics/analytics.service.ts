import { Injectable } from '@nestjs/common';
import { RepositoryService } from '../repository/repository.service';
import { FeroziStat } from '../models/ferozi.stat.mode';
import { Ferozi } from '../models/ferozi.model';
import { FeroziNature } from '@prisma/client';
import { FeroziAnalytics } from '../models/analytics.model';

@Injectable()
export class AnalyticsService {
  constructor(private readonly repository: RepositoryService) {}

  async getFeroziStats(feroziID: string): Promise<FeroziStat> {
    const data = await this.repository.getFeroziStatusCount(feroziID);
    return FeroziStat.fromEntity(data);
  }

  async getFeroziAnalytics(ferozi: Ferozi): Promise<FeroziAnalytics> {
    const feroziStat = await this.getFeroziStats(ferozi.id);
    return {
      ...feroziStat,
        currentCapacity: this.getCurrentCapacity(ferozi, feroziStat),
    };
  }

  getCurrentCapacity(ferozi: Ferozi, feroziStat: FeroziStat): number {
    if (ferozi.nature === FeroziNature.PESSIMISTIC) {
      return feroziStat.controlCount + feroziStat.treatmentCount;
    }
    return (
      feroziStat.acknowledgedTreatmentCount +
      feroziStat.acknowledgedControlCount
    );
  }
}

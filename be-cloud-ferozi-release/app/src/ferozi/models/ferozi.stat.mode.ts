import { UserFeroziStatus } from '@prisma/client';
import { FeroziStatEntinty } from '../repository/models/ferozi.stats.entity';

export class FeroziStat {
  sampleCount: number;
  treatmentCount: number;
  controlCount: number;

  acknowledgedTreatmentCount: number;
  acknowledgedControlCount: number;

  constructor(
    sampleCount?: number,
    treatmentCount?: number,
    controlCount?: number,
    ackmowledgedTreatmentCount?: number,
    acknowledgedControlCount?: number,
  ) {
    this.sampleCount = sampleCount ?? 0;
    this.treatmentCount = treatmentCount ?? 0;
    this.controlCount = controlCount ?? 0;
    this.acknowledgedTreatmentCount = ackmowledgedTreatmentCount ?? 0;
    this.acknowledgedControlCount = acknowledgedControlCount ?? 0;
  }

  static fromEntity(
    entity: Record<UserFeroziStatus, FeroziStatEntinty>,
  ): FeroziStat {
    if (!entity) return new FeroziStat();
    return new FeroziStat(
      entity[UserFeroziStatus.SAMPLE].total,
      entity[UserFeroziStatus.TREATMENT].total,
      entity[UserFeroziStatus.CONTROL].total,
      entity[UserFeroziStatus.TREATMENT].acknowledged,
      entity[UserFeroziStatus.CONTROL].acknowledged,
    );
  }
}

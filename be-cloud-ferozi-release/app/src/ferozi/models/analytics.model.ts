export class FeroziAnalytics {
  sampleCount: number;
  treatmentCount: number;
  controlCount: number;

  acknowledgedTreatmentCount: number;
    acknowledgedControlCount: number;
    
    currentCapacity: number;

  constructor(
    sampleCount?: number,
    treatmentCount?: number,
    controlCount?: number,
    ackmowledgedTreatmentCount?: number,
      acknowledgedControlCount?: number,
        currentCapacity?: number,
  ) {
    this.sampleCount = sampleCount ?? 0;
    this.treatmentCount = treatmentCount ?? 0;
    this.controlCount = controlCount ?? 0;
    this.acknowledgedTreatmentCount = ackmowledgedTreatmentCount ?? 0;
      this.acknowledgedControlCount = acknowledgedControlCount ?? 0;
        this.currentCapacity = currentCapacity ?? 0;
  }
}

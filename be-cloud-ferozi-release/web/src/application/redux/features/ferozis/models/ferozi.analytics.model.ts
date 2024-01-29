import { Ferozi } from './ferozi';
import { FeroziCapacityState } from './ferozi.capacity.state.model';
import { FeroziNature } from './ferozi.nature.model';
import { FeroziStat } from './ferozi.stat.model';

export class FeroziAnalytics {
    id: string;
    name: string;
    passPercentage: number;
    isActive: boolean;
    maxCapacity: number;
    createdAt: string;
    type: string;
    nature: FeroziNature;
    sampleCount: number;
    controlCount: number;
    treatmentCount: number;
    acknowledgedControlCount: number;
    acknowledgedTreatmentCount: number;
    //Calcuated properties
    currentCapacity: number;
    remainingCapacity: number;
    totalAcknowledgedCount: number;
    totalExperimentedCount: number;
    capacityState: FeroziCapacityState;
    givenTreatmentPercentage: number;
    givenControlPercentage: number;
    expectedTreatmentCount: number;

    constructor(ferozi: Ferozi, feroziStat: FeroziStat) {
        this.id = ferozi.id;
        this.name = ferozi.name;
        this.passPercentage = ferozi.passPercentage;
        this.isActive = ferozi.isActive;
        this.maxCapacity = ferozi.maxCapacity;
        this.createdAt = ferozi.createdAt;
        this.type = ferozi.type;
        this.nature = ferozi.nature as FeroziNature;
        this.sampleCount = feroziStat.sampleCount;
        this.controlCount = feroziStat.controlCount;
        this.treatmentCount = feroziStat.treatmentCount;
        this.acknowledgedControlCount = feroziStat.acknowledgedControlCount;
        this.acknowledgedTreatmentCount = feroziStat.acknowledgedTreatmentCount;
        //Calcuated properties
        this.totalAcknowledgedCount = this.acknowledgedControlCount + this.acknowledgedTreatmentCount;
        this.totalExperimentedCount = this.controlCount + this.treatmentCount;
        this.currentCapacity = this.getCurrentCapacity();
        this.remainingCapacity = this.maxCapacity - this.totalExperimentedCount;
        this.capacityState = this.getCapacityState();
        this.givenTreatmentPercentage = this.getGivenTreatmentPercentage(ferozi.passPercentage);
        this.givenControlPercentage = this.getGivenControlPercentage(ferozi.passPercentage);
        this.expectedTreatmentCount = this.getExpectedTreatmentCount();
    }

    private getCurrentCapacity(): number {
        return this.nature === FeroziNature.OPTIMISTIC
            ? this.totalAcknowledgedCount
            : this.totalExperimentedCount;
    }

    private getCapacityState(): FeroziCapacityState {
        if (this.currentCapacity >= this.maxCapacity) {
            return FeroziCapacityState.MAXED_OUT;
        }
        return FeroziCapacityState.AVAILABLE;
    }

    private getGivenTreatmentPercentage(passPercentage: number): number {
        return passPercentage;
    }

    private getGivenControlPercentage(passPercentage: number): number {
        return 100 - passPercentage;
    }

    private getExpectedTreatmentCount(): number {
        return this.maxCapacity * (this.passPercentage / 100);
    }
}

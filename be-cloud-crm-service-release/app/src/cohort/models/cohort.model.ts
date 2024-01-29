import { Availability } from 'src/constants/enums/availability.enum';
import { CohortDbModel } from '../../database/models/cohort.db.model';

export class Cohort {
  id: string;
  name: string;
  adminID: string;
  type: string;
  availability: Availability;

  constructor(data?: CohortDbModel) {
    this.id = data?.id ?? '';
    this.name = data?.name ?? '';
    this.adminID = data?.adminID ?? '';
    this.type = data?.type ?? '';
    this.availability = data?.availability ?? ('' as Availability);
  }
}

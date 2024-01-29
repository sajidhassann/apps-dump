import { CohortCallDbModel } from '../../database/models/cohort.call.db.model';

export class CohortCall {
  id: string;
  fName: string;
  lName: string;
  cohortID: string;
  notes: string;
  interestedIn: string;
  phoneType: string;
  number: string;
  board: string;
  subjects: string[];
  tags: string[];
  isTuition: boolean;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: CohortCallDbModel) {
    this.id = data.id ?? '';
    this.fName = data.fName ?? '';
    this.lName = data.lName ?? '';
    this.cohortID = data.cohortID ?? '';
    this.notes = data.notes ?? '';
    this.interestedIn = data.interestedIn ?? '';
    this.phoneType = data.phoneType ?? '';
    this.number = data.number ?? '';
    this.board = data.board ?? '';
    this.subjects = data.subjects ?? [];
    this.tags = data.tags ?? [];
    this.isTuition = data.isTuition ?? false;
    this.status = data.status ?? '';
    this.createdAt = new Date(data?.createdAt ?? '');
    this.updatedAt = new Date(data?.updatedAt ?? '');
  }
}

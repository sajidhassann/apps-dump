import { CallStatus, InterestStatus } from '@prisma/client';
import PaginatedList from 'src/models/paginated.list';

export default class ListPaginatedCohortCall extends PaginatedList {
  cohortID: string;
  agentEmail?: string;
  date?: Date;
  interestStatus?: InterestStatus;
  number?: string;
  status?: CallStatus;
  grade?: string;

  constructor(data: ListPaginatedCohortCall) {
    super(data);
    this.cohortID = data.cohortID;
    this.agentEmail = data.agentEmail;
    this.date = data.date ? new Date(data.date) : data.date;
    this.interestStatus = data.interestStatus;
    this.number = data.number;
    this.status = data.status;
    this.grade = data.grade;
  }
}

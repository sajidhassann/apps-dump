export interface ListCohortCall {
  cohortID: string;
  agentEmail: string;
  date: Date;
  interestedIn: string;
  skip?: number;
  take?: number;
}

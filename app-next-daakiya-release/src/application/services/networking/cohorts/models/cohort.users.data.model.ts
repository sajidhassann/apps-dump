
export class CohortUsersDataModel {
  readonly users: number
  readonly reachable: number

  constructor(data: CohortUsersDataModel) {
    this.users = data.users ?? 0
    this.reachable = data.reachable ?? 0
  }
}
export class Cohort {
  readonly id: string
  readonly name: string

  constructor(data: Cohort) {
    this.id = data.id ?? ''
    this.name = data.name ?? ''
  }
}

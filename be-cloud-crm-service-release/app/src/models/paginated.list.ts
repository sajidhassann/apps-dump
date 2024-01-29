export default class PaginatedList {
  readonly pageSize: number;
  readonly pageNumber: number;
  readonly search?: string;

  constructor(data: PaginatedList) {
    this.pageNumber = Number(data.pageNumber) || 1;
    this.pageSize = Number(data.pageSize) || 25;
    this.search = data.search;
  }
}

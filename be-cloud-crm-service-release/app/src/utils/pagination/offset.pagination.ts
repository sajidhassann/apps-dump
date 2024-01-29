interface IOffsetPagination<T> {
  count: number;
  items: T[];
  pageSize: number;
  pageNumber: number;
}

export default class OffsetPagination<T> {
  readonly totalPages: number;
  readonly pageSize: number;
  readonly count: number;
  readonly pageNumber: number;
  readonly items: T[];
  constructor(props: IOffsetPagination<T>) {
    this.items = props.items;
    this.count = props.count;
    this.pageSize = props.pageSize;
    this.pageNumber = props.pageNumber;
    this.totalPages = Math.ceil(this.count / this.pageSize);
  }
}

export class Pagination<T> {
   totalPages: number
   pageSize: number
   pageNumber: number
   count: number
   items: T[]

   constructor(data: Pagination<T>) {
      this.pageSize = data.pageSize ?? 10
      this.count = data.count ?? 0
      this.pageNumber = data.pageNumber ?? 0
      this.totalPages = this.count
         ? Math.ceil(this.count / this.pageSize)
         : data.totalPages
      this.items = data.items ?? [] // TODO: look if create new instances here of type T
   }
}


export interface ISearchResult<T> {
  // 数据的总数
  count: number
  // 数据的数组
  data: T[]
  // 查询的错误
  errors: string[]
}

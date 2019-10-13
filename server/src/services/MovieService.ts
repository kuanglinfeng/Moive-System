import { Movie } from "../entities/Movie"
import { IMovie } from "../db/MovieSchema"
import { MovieModel } from "../db/index"
import { SearchCondition } from "../entities/SearchCondition"
import { ISearchResult } from "../entities/CommonTypes"

export class MovieService {

  public static async add(movie: Movie): Promise<IMovie | string[]> {
    // 1. 转换类型，movie可能是一个plain object
    movie = Movie.transform(movie)
    // 2. 数据验证
    const errors: string[] = await movie.validateThis()
    if (errors.length > 0) {
      return errors
    }
    // 3. 添加到数据库
    const res = await MovieModel.create(movie)
    return res
  }

  /**
   * 修改数据库中的一条电影数据
   * @param id 电影的id
   * @param movie 修改后的电影，可以只添加部分属性，未添加的属性将和原来的那条数据一致
   */
  public static async edit(id: string, movie: Movie): Promise<string[]> {
    // 1. 转换类型，movie可能是一个plain object
    const movieObj = Movie.transform(movie)
    // 2. 数据验证 （跳过那些缺失的属性）
    const errors: string[] = await movieObj.validateThis(true)
    if (errors.length > 0) {
      return errors
    }
    // 3. 添加到数据库
    await MovieModel.updateOne({ _id: id }, movie)
    return errors
  }

  /**
   * 删除数据库中的一条电影数据
   * @param id 电影的id
   */
  public static async delete(id: string): Promise<void> {
    await MovieModel.deleteOne({ _id: id })
  }

  /**
   * 删除数据库中的一条电影数据
   * @param id 电影的id
   */
  public static async findById(id: string): Promise<IMovie | null> {
    const res = await MovieModel.findOne({ _id: id })
    return res
  }

  /**
   * 查询电影
   * @param condition{page, limit, key}
   */
  public static async find(condition: SearchCondition): Promise<ISearchResult<IMovie>> {
    // 1. 转换类型，movie可能是一个plain object
    const conObj = SearchCondition.transform(condition)
    // 2. 数据验证 （跳过那些缺失的属性）
    const errors: string[] = await conObj.validateThis(true)
    if (errors.length > 0) {
      return {
        count: 0,
        data: [],
        errors
      }
    }
    // 3. 模糊查询 执行find -> 获得所有模糊查询的结果 -> skip -> 跳过condition.page页之前的所有数据 -> limit
    //    -> 取condition.limit条数据
    const movies: IMovie[] = await MovieModel.find({
      name: {$regex: new RegExp(condition.key)}
    }).skip((conObj.page - 1) * conObj.limit).limit(conObj.limit)

    const count = await MovieModel.find({
      name: {$regex: new RegExp(condition.key)}
    }).countDocuments()

    return {
      count,
      data: movies,
      errors: []
    }
  }
}

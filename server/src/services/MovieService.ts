import { Movie } from "../entities/Movie"
import { IMovie } from "../db/MovieSchema"
import { MovieModel } from "../db/index"

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
    await MovieModel.updateOne({_id: id}, movie)
    return errors
  }

  /**
   * 删除数据库中的一条电影数据
   * @param id 电影的id
   */
  public static async delete(id: string): Promise<void> {
    await MovieModel.deleteOne({_id: id})
  }

  public static async findById(id: string): Promise<IMovie | null> {
    const res = await MovieModel.findOne({_id: id})
    return res
  }

}

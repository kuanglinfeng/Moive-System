import "reflect-metadata"
import { MovieModel } from "./db/index"
import { Movie } from "./entities/Movie"
import { MovieService } from "./services/MovieService"
import { IMovie } from "./db/MovieSchema"

const m: any = {
  name: "flinn",
  timeLong: 1,
  types: ["xixi"],
  areas: ["china"]
}

// const m: any = {
//   name: "liulangdiqiu"
// }

// MovieService.add(m).then(res => {
//   if (Array.isArray(res)) {
//     console.log(res)
//   } else {
//     console.log(res._id)
//   }
// })

// MovieService.edit("5da2bc67bff38c283923af00", m).then(res => {
//   console.log(res)
// }).catch(err => console.log(err))

// MovieService.delete("5da2bc67bff38c283923af00").then(() => console.log("删除成功"))

MovieService.findById("5da2c61bf0b0e3324a6898d7").then((res: IMovie) => console.log(res.name))

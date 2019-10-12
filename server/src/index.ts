import "reflect-metadata"
import { validate } from "class-validator"
import { Movie } from "./entities/Movie"
import { plainToClass } from "class-transformer"

const m: any = {};
m.name = 1
m.types = "1321"
m.areas = ["中国大陆"]
m.isClassic = true
m.timeLong = 1

// 将字面量对象转换为Movie对象
const movie = plainToClass(Movie, m as object)
console.log(movie)
validate(movie).then(errors => {
  console.log(errors)
})

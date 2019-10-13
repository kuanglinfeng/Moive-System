import "reflect-metadata"
import { MovieService } from "./services/MovieService"
import { Movie } from "./entities/Movie"

function getRandom(min: number, max: number) {
  const dec = max - min
  return Math.floor(Math.random() * dec + min)
}

// for (let i = 0; i < 100; i++) {
//   const m = new Movie()
//   m.name = "电影" + (i + 1)
//   m.areas = ["中国大陆", "美国"]
//   m.types = ["喜剧", "爱情"]
//   m.isClassic = true
//   m.timeLong = getRandom(70, 240)
//   MovieService.add(m)
// }

const condition: any = {
  page: 1,
  limit: 5,
  key: "10"
}

MovieService.find(condition).then(res => {
  if (res.errors.length > 0) {
    console.log(res.errors)
  } else {
    res.data.forEach(item => {
      console.log(item.name)
    })
    console.log("总数：" + res.count)
  }
})

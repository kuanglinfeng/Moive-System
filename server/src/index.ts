import "reflect-metadata"
import { MovieService } from "./services/MovieService"
import { Movie } from "./entities/Movie"
import Express from "express"
import MovieRouter from "./routes/movieRoute"
import UploadRouter from "./routes/UploadRoute"

const app = Express()

// 图片静态资源
app.use("/upload", Express.static("public/upload"))

// 配置中间件，用于解析请求消息体中的json格式数据
app.use(Express.json())

// 使用postman测试接口
app.use("/api/movie", MovieRouter)
// 文件上传
// 通常情况下，服务器会提供一个统一的api接口，用于处理上传的文件
app.use("/api/upload", UploadRouter)

app.listen(3000)

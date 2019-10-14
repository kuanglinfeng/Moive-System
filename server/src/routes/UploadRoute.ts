import Express from "express"
import multer from "multer"
import path, { extname } from "path"
import { ResponseHelper } from "./ResponseHelper"

const router = Express.Router()

// 文件保存的配置
const storage = multer.diskStorage({
  // 存储的目标位置
  destination: path.resolve(__dirname, "../../public/upload"),
  // 文件名
  filename(req, file, cb) {
    // 文件名是啥
    const time = new Date().getTime()
    // 后缀名是啥
    const originFileName = file.originalname
    const extName =  path.extname(originFileName)
    // 设置文件的全名
    cb(null, `${time}${extName}`)
  }
})

const allowedExtensions = [
  ".jpg",
  ".png",
  ".jpeg",
  ".gif",
  ".bmp",
  ".jiff"
]

const upload = multer({
  storage,
  limits: {
    // 文件大小最多1MB
    fileSize: 1024 * 1024
  },
  fileFilter(req, file, cb) {
    const extName = path.extname(file.originalname)
    if (allowedExtensions.includes(extName)) {
      cb(null, true)
    } else {
      cb(new Error("文件类型不正确"), false)
    }
  }
}).single("imgfile")

router.post("/", (req, res) => {
  // 上传文件的时候执行
  upload(req, res, err => {
    if (err) {
      // 发生错误
      ResponseHelper.sendError(err.message as string, res)
    } else {
      // 返回文件路径给客户端
      const url = `/upload/${req.file.filename}`
      ResponseHelper.sendData(url, res)
    }
  })
})

export default router

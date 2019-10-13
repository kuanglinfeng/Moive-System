import { validate } from "class-validator"
import { plainToClass } from "class-transformer"
import { ClassType } from "class-transformer/ClassTransformer"

export abstract class BaseEntity {

  /**
   * 验证的就是当前对象
   * @param skipMissing 验证的时候是否跳过没有填写的属性
   * @return 返回的是一个promise对象，当promise对象得到结果后返回的是一个string数组
   */
  public async validateThis(skipMissing = false): Promise<string[]> {
    // skipUndefinedProperties
    const errors = await validate(this, {
      skipUndefinedProperties: skipMissing
    })
    const temp: string[][] = errors.map(item => {
      return Object.values(item.constraints)
    })
    const res: string[] = []
    temp.forEach(item => {
      res.push(...item)
    })
    return res
  }

  /**
   * 将一个平面对象转换为Movie对象
   * @param plainObject 平面对象
   */
  protected static baseTransform<T>(cls: ClassType<T>, plainObject: object): T {
    if (plainObject instanceof cls) {
      return plainObject
    }
    return plainToClass(cls, plainObject)
  }
}

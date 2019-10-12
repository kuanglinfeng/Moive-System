# 电影管理系统

使用TypeScript仿写猫眼后台管理系统

## 分工

服务器端：提供API接口

客户端：ajax请求接口获取数据，使用技术渲染页面

## 技术栈

服务器端：ts + express + mongodb + class-validator + class-transformer

客户端：ts + react全家桶（react-router、redux、antd）

## 开发顺序

1. 服务器端

使用postman测试

2. 客户端

> tslint: 和jslint相似，用于检查代码风格

## 配置server环境

1. 创建client、server文件夹

2. 进入server文件夹

3. yarn init -y、tsc --init 初始化工程

5. 配置tsconfig.json 

6. 进入`package.json`配置scripts
  
   添加```"build": "rm -r dist & tsc"```： 删除所有文件再执行tsc

   ```"dev": "nodemon --watch src -e ts --exec ts-node src/index.ts"```：-e ts 表示监控后缀名为ts的文件

## 开发Movie类

### 实现对电影属性的验证

注意点：

1. 从服务器获取的数据对象一般都是对象字面量，所以我们需要把这种对象转换成Movie类的实例对象，以便对其各种属性进行验证

2. 可以通过导入`class-transformer`，并且通过`函数plainToClass`,和`装饰器@Type(这里写类型)`,来实现1

3. 导入`class-transformer`的时候，需要`import "reflect-metadata"`，因为前者依赖后者实现的

第六节


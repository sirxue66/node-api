const path = require("path")

const Koa = require('koa')
const KoaBody = require('koa-body')
const KoaStatic = require('koa-static')        //静态资源映射的插件
const Parameter = require('koa-parameter')          //参数校验插件

//引入路由
const router = require("../router/index")

// const userRouter = require("../router/user.router")
// const goodsRouter = require("../router/goods.router")

//实例化 Koa对象
const app = new Koa();

app.use(KoaBody(
    {
        multipart: true,     //打开解析文件上传功能
        formidable: {
            uploadDir: path.join(__dirname, '../upload'),               //上传文件的保存路径
            keepExtensions: true        //保持文件后缀名
        }
    }
))           //koabody 中间件要在router之前使用,用来解析接收前端传来的post请求body
app.use(KoaStatic(path.join(__dirname, '../upload')))
app.use(Parameter(app));

// app.use(userRouter.routes())      //使用路由中间件
// app.use(goodsRouter.routes())
app.use(router.routes());
app.use(router.allowedMethods());       //对于不支持的请求类型，返回501友好错误

//统一错误处理
app.on('error',(obj,ctx) => {
    ctx.status = 500;
    ctx.body = obj;
})

module.exports = app
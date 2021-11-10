const Koa = require('koa')
const KoaBody = require('koa-body')
//引入路由
const userRouter = require("../router/user.router")

//实例化 Koa对象
const app = new Koa();

app.use(KoaBody())           //koabody 中间件要在router之前使用,用来解析接收前端传来的post请求body
app.use(userRouter.routes())      //使用路由中间件

//统一错误处理
app.on('error',(obj,ctx) => {
    ctx.status = 500;
    ctx.body = obj;
})

module.exports = app
const Koa = require('koa')
//引入路由
const userRouter = require("../router/user.router")

//实例化 Koa对象
const app = new Koa();

app.use(userRouter.routes())      //使用路由中间件

module.exports = app
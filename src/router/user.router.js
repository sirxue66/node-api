const Router = require("koa-router")
const { register, login } = require("../controller/user.controller")

const userRouter = new Router({prefix: '/user'})     //参数是默认前缀

// userRouter.post('/',(ctx,next) => {
//     ctx.body = "这是用户类的接口地址";
// })
userRouter.post('/register',register)

userRouter.post('/login',login)

module.exports = userRouter
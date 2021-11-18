/*
* 用户模块
* */
const Router = require("koa-router")
const {userValidator, verifyUser, verifyLogin} = require("../middleware/user.middleware")
const {crpytPassword, crpytNewPassword} = require("../middleware/bcrpyt")
const {auth} = require("../middleware/auth.middleware")
const { register, login, resetPassword, logout } = require("../controller/user.controller")

const userRouter = new Router({prefix: '/user'})     //参数是默认前缀

// userRouter.post('/',(ctx,next) => {
//     ctx.body = "这是用户类的接口地址";
// })
userRouter.post('/register',userValidator, verifyUser, crpytPassword, register)   //使用多个中间件  两个校验数据的，一个处理数据的

userRouter.post('/login', userValidator, verifyLogin, login)

userRouter.post('/resetPassword', auth, crpytNewPassword, resetPassword)

userRouter.post('/logout',logout)

module.exports = userRouter
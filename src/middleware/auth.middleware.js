/*
* 用户授权的中间件
* */
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../config/default")

//验证token
const auth = async (ctx,next) => {
    const {authorization} = ctx.request.header;
    const token = authorization.replace('Bearer', '');
    console.log("用户token",token);
    try {
        // user 是当时放进token的用户信息
        const user = jwt.verify(token, JWT_SECRET);       //如果失败会抛出error的状态
        ctx.state.user = user;
    }
    catch (e) {
        console.error(e,"用户权限校验失败");
        switch (e.name){
            case 'TokenExpiredError':
                console.error("token已过期",e);
                return ctx.body = {
                    code: "1101",
                    message: "登录过期，请重新登录"
                };
            case 'JsonWebTokenError':
                console.error("token 无效",e);
                return  ctx.body = {
                    code: "1102",
                    message: "无效token,登录失败"
                }
        }

        ctx.app.emit('error',{
            code:"1001",
            message: "服务器出错，用户权限校验失败"
        },ctx)
    }

    await next();
}

module.exports = {
    auth
}
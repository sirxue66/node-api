/*
* 用户授权的中间件
* */
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../config/default")
const blackUser = require("../config/blackList")

//验证token
const auth = async (ctx,next) => {
    const {authorization} = ctx.request.header;
    const token = authorization.replace('Bearer ', '').trim();   //将token首尾的空格去掉
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcl9uYW1lIjoi5bCP5piOIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE2MzY1MjY1MTcsImV4cCI6MTYzNjYxMjkxN30.LOoTygbANVKg9D7U95dcg8825qf8r6oGg7fcYihdBT8";
    // console.log("用户token",token);
    //校验是否在退出黑名单
    if(blackUser.indexOf(token) >= 0){
        return ctx.body = {
            code: "1103",
            message: "您已退出，请重新登录"
        };
    }
    try {
        // console.log("校验的token密钥",JWT_SECRET);
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
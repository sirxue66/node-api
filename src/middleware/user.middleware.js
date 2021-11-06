/*
* 检验数据的中间件
* */
const {findUserInfo} = require("../service/user.service");
const userValidator =  async (ctx, next) => {
    let {user_name, password} = ctx.request.body;
    if(!user_name || !password){
        console.error("用户名或密码为空");
        ctx.status = 400;
        ctx.body = {
            code: "0002",
            message: "用户名或密码不能为空"
        };
        return       //防止代码继续执行
    }
    await next();    //校验通过，执行下一个中间件
}
const verifyUser = async (ctx,next) => {
    let {user_name} = ctx.request.body;
    try {
        let fres = await findUserInfo({user_name});
        if(fres !== null){
            console.error("用户名已注册", {user_name});
            ctx.body = {
                code: "0001",
                message: "该用户名已存在"
            };
            return
        }
    } catch (err){
        console.error("获取用户数据失败",err);
        ctx.app.emit('error',{
            code: "1001",
            message: "服务器出错，查询失败"
        },ctx)
        return
    }
    await next();
}
module.exports = {
    userValidator,
    verifyUser
}

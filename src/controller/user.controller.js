/*
* conteoller层   业务逻辑
*/
const {createUser, findUserInfo} = require("../service/user.service")
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../config/default")

//实现一些对接口的逻辑操作，实现相应路由的实现函数
class UserController {
    //注册
    async register(ctx,next){
        //接收数据
        console.log(ctx.request.body);
        let {user_name,password} = ctx.request.body;
        //校验数据
        // if(!user_name || !password){
        //     console.error("用户名或密码为空");
        //     ctx.status = 400;
        //     ctx.body = {
        //         code: "10001",
        //         message: "用户名或密码不能为空"
        //     };
        //     return       //防止代码继续执行
        // }

        // let fres = await findUserInfo({user_name});
        // if(fres !== null){
        //     ctx.body = {
        //         code: "0001",
        //         message: "该用户名已存在"
        //     };
        //     return
        // }
        try {
            //操作数据库
            let res = await createUser(user_name,password);
            //响应数据
            ctx.body = {
                code: "0000",
                message: "注册成功",
                result: {
                    id: res.id,
                    userName: res.user_name
                }
            };
        } catch (err){
            console.error(err);
            ctx.app.emit('error',{
                code: "1001",
                message: "服务器出错，注册失败"
            },ctx);
        }

    }
    //登录
    async login(ctx,next){
        const {user_name} = ctx.request.body;
        //将用户 id user_name, isAdmin 放进token中
        try {
            let res = await findUserInfo({user_name});
            let {password, ...userInfo} = res;          //利用解构将查出来的用户信息除了password，其余的放入userInfo中

            ctx.body = {
                code: "0000",
                message: "登录成功",
                result: {
                    token: jwt.sign(userInfo, JWT_SECRET, {expiresIn: '1d'}),      //用户信息    密钥    过期时间
                    userInfo: userInfo
                }
            }
        }
        catch (e) {
            console.error(e,"登录失败");
            ctx.app.emit('error',{
                code: "1002",
                message: "抱歉，登录失败"
            },ctx);
        }
    }

    //修改密码
    async resetPassword(ctx,next){

        ctx.body = "密码修改成功";
    }
}

module.exports = new UserController()
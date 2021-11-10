/*
* conteoller层   业务逻辑
*/
const {createUser, findUserInfo, updateUserInfo} = require("../service/user.service")
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../config/default")
const blackUser = require("../config/blackList")

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
            let {password, ...userInfo} = res;          //利用解构将查出来的用户信息 除了 password，其余的放入userInfo中
            console.log("登录的token密钥",JWT_SECRET);
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
        const {newPassword} = ctx.request.body;
        const {id} = ctx.state.user;
        if(!newPassword){
            ctx.body = {
                code: "0001",
                message: "新密码不能为空"
            };
        }
        try {
            let res = await updateUserInfo({password: newPassword},id);
            if(res){
                ctx.body = {
                    code: "0000",
                    message: "密码修改成功"
                };
            } else {
                ctx.body = {
                    code: "0002",
                    message: "密码修改失败"
                };
            }
        }
        catch (e) {
            console.error(e,"密码修改失败");
            ctx.app.emit('error',{
                code: "1002",
                message: "抱歉，密码修改失败"
            },ctx);
        }
    }

    //退出(jwt无法删除token，所以使用黑名单的方法来实现退出功能，   也可以前台直接删除存储的token)
    async logout(ctx,next){
        const {authorization} = ctx.request.header;
        const token = authorization.replace('Bearer ', '').trim();
        blackUser.push(token);
        ctx.body = {
            code: "0000",
            message: "退出成功"
        };
    }
}

module.exports = new UserController()
//使用bcrpyt 对密码进行加密
const bcrypt = require("bcryptjs")

//密码加密中间件
const crpytPassword = async (ctx,next) => {
    let {password} = ctx.request.body;
    let salt = bcrypt.genSaltSync(5);     //加盐处理，同步加盐
    let hash = bcrypt.hashSync(password, salt);         //加密成密文

    ctx.request.body.password = hash;

    await next();
}

module.exports = {
    crpytPassword
}
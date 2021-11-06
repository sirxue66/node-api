/*
* service层   对数据操作处理
*/
const User = require("../model/user.model")
//安装 sequelize 数据库工具 和 mysql2 数据库驱动         使用mysql数据库
class UserService {
    async createUser(user_name,password){
        let res = await User.create({
            user_name: user_name,
            password: password
        });
        console.log(res);
        return res.dataValues;
    }

    async findUserInfo({id,user_name,is_admin}){
        let whereOptions = {};
        id && Object.assign(whereOptions, {id});        //id存在 就合并到whereOptions对象中
        user_name && Object.assign(whereOptions, {user_name});
        is_admin && Object.assign(whereOptions, {is_admin});

        let res = await User.findOne({
            attributes: ['id','user_name','is_admin'],  //查询的字段名
            where: whereOptions
        });
        return res ? res.dataValues : null
    }
}

module.exports = new UserService()
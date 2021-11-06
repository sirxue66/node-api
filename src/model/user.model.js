/*
* model层   创建数据表
*/
const { DataTypes }  = require("sequelize")
const seq = require("../db/seq")

//创建数据模型
const User = seq.define("node_user",
    //id  自动生成
    {
        user_name:{
            type: DataTypes.STRING,    //数据类型
            allowNull: false,         //是否允许为空
            unique: true,             //是否唯一
            comment: "用户名"         //注释
        },
        password:{
            type: DataTypes.CHAR(64),
            allowNull: false,
            comment: "密码"
        },
        is_admin:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0,
            comment: "0 用户  1 管理员"
        }
    }
)

//用函数 创建对应数据表
// User.sync({force: true})      //force：true 表示数据库如果有同名的表将删除该表重新建,创建的时候执行一下这个函数就可以了

module.exports = User


















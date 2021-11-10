/*
* 连接数据库
*/
const { Sequelize } = require("sequelize")       //sequelize 数据库工具
const { MYSQL_HOST,
        MYSQL_PORT,
        MYSQL_USER,
        MYSQL_PWD,
        MYSQL_DB } = require("../config/default")
//连接数据库
const seq = new Sequelize(MYSQL_DB,MYSQL_USER,MYSQL_PWD,{
    host:MYSQL_HOST,
    port:MYSQL_PORT,
    dialect:"mysql"
});

//测试连接
// seq.authenticate().then(
//     () => {
//         console.log("数据库连接成功！");
//     }
// ).catch(
//     (err) => {
//         console.error("数据库连接失败",err);
//     }
// )

module.exports = seq

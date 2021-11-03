const dotenv = require('dotenv')

//调用dotenv的config（）方法将.env文件的配置项读到 process.env对象中
    dotenv.config()

module.exports = process.env
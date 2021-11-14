const fs = require("fs")

const Router = require("koa-router")
const router = new Router();

fs.readdirSync(__dirname).forEach(file => {        //使用fs读当前目录下的文件名称，会返回一个数组
    // console.log(file);
    if(file !== "index.js"){
        let r = require('./' + file);
        router.use(r.routes());
    }
})

module.exports = router

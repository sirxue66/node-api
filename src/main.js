//引入配置文件
const { APP_PORT } = require("./config/default")

//使用中间件，并且use 只能写一个中间件函数，只接受函数作为中间件
// app.use((ctx,next) => {
//     ctx.body = "hello node API"     //返回的body内容
// })
//当内容修改的时候，使用nodemon 来自动重启项目
//使用dotenv 工具来读取配置文件

const app = require("./app/index.js")
//监听5000端口
app.listen(APP_PORT,() => {
    console.log(`server is running on http://localhost:${APP_PORT}`);
})




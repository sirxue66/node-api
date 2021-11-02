const Koa = require('koa')
//实例化 Koa对象
const app = new Koa();

//使用中间件，并且use 只能写一个中间件函数
app.use((ctx,next) => {
    ctx.body = "hello node"     //返回的body内容
})

//监听5000端口
app.listen(5000,() => {
    console.log("server is running on http://localhost:5000");
})


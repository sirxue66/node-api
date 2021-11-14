const Router = require("koa-router")
const {upload, addGoods} = require("../controller/goods.controller")
const {auth, isAdmin} = require("../middleware/auth.middleware")
const {validators} = require("../middleware/goods.middleware")


const goodsRouter = new Router({prefix:"/goods"})

//商品图片上传
goodsRouter.post('/upload', auth, isAdmin, upload)

//添加商品
goodsRouter.post('/add', auth, isAdmin, validators, addGoods)

module.exports = goodsRouter;
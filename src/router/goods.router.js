/*
* 商品模块
* */
const Router = require("koa-router")
const {upload, addGoods, updateGoods, removeGoods, deleteGoods, restoreGoods, getGoods} = require("../controller/goods.controller")
const {auth, isAdmin} = require("../middleware/auth.middleware")
const {validators} = require("../middleware/goods.middleware")


const goodsRouter = new Router({prefix:"/goods"})

//商品图片上传
goodsRouter.post('/upload', auth, isAdmin, upload)

//添加商品
goodsRouter.post('/add', auth, isAdmin, validators, addGoods)

//修改商品
goodsRouter.put('/update/:id', auth, isAdmin, validators, updateGoods)

//删除商品
goodsRouter.delete('/remove/:id', auth, isAdmin, removeGoods)

//下架商品(软删除)
goodsRouter.post('/off/:id', auth, isAdmin, deleteGoods)

//上架商品
goodsRouter.post('/on/:id', auth, isAdmin, restoreGoods)

//商品列表(接收pageNum,pageSize做分页)
goodsRouter.get('/', auth, getGoods)

module.exports = goodsRouter;

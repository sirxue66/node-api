/*
* 购物车模块
* */
const Router = require('koa-router')

const {auth} = require('../middleware/auth.middleware')
const {addCart, removeCart} = require('../controller/cart.controller')
const {validatorAdd} = require('../middleware/cart.middleware')

const cartRouter = new Router({prefix: '/carts'})

//添加购物车
cartRouter.post('/addCart', auth, validatorAdd, addCart)

//从购物车移出商品
cartRouter.post('removeCart', auth, validatorAdd, removeCart)

module.exports = cartRouter
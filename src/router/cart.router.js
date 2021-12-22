/*
* 购物车模块
* */
const Router = require('koa-router')

const {auth} = require('../middleware/auth.middleware')
const {addCart, updateCart, getCarts, removeCarts, getCartsCounts} = require('../controller/cart.controller')
const {validatorParamsOrQuery, hasGoodsId} = require('../middleware/cart.middleware')

const cartRouter = new Router({prefix: '/carts'})

//添加购物车
cartRouter.post('/addCart', auth, validatorParamsOrQuery({goods_id:{type:'string',required:true}}), hasGoodsId, addCart)

//更新购物车
cartRouter.patch('/updateCart/:id',        //补丁类型，有值就改，没值就不操作
    auth,
    validatorParamsOrQuery({
        number:{type:'string',required:false},
        selected: {type: 'bool', required: false}
    }),
    updateCart)

//获取购物车列表
cartRouter.get('/', auth, getCarts)

//移除购物车
cartRouter.post('/remove', auth, validatorParamsOrQuery({ids: 'array'}), removeCarts)

//获取购物车商品总数
cartRouter.get('/counts', auth, getCartsCounts)

module.exports = cartRouter
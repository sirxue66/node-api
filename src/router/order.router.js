/*
* 订单模块
* */
const Router = require('koa-router')

const orderRouter = new Router({prefix: '/order'});

orderRouter.post('/createOrder',);

orderRouter.post('/updateOrder',);

orderRouter.post('/deleteOrder',);

orderRouter.get('/',);

module.exports = orderRouter;
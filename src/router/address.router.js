/*
* 地址管理模块
* */
const Router = require('koa-router');

const {addAddressController, removeAddressController, updateAddressController, getAddressController} = require('../controller/address.controller');
const {auth} = require('../middleware/auth.middleware');
const {validatorParamsOrQuery} = require('../middleware/address.middleware')


const addressRouter = new Router({prefix: '/address'});

addressRouter.post('/addAddress', auth, validatorParamsOrQuery('add'), addAddressController);

addressRouter.post('/removeAddress', auth, validatorParamsOrQuery('remove'), removeAddressController);

addressRouter.post('/updateAddress', auth, validatorParamsOrQuery('update'), updateAddressController);

addressRouter.get('/', auth, getAddressController);


module.exports = addressRouter;
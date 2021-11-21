const Goods = require('../model/goods.model')
const validatorParamsOrQuery = (rules) => {
    return async (ctx, next) => {
        try {
            ctx.verifyParams(rules)
        } catch (err){
            console.error("添加购物车参数错误",ctx.request.body);
            return  ctx.body = {
                code:"0001",
                message:"添加购物车失败，参数错误",
                result: err
            };
        }

        await next();
    }
}

const hasGoodsId = async (ctx,next) => {
    const goods_id = ctx.request.body.goods_id * 1;
    let res = await Goods.findOne({
        where: {id: goods_id}
    });
    if(res){
        await next();
    } else {
        return ctx.body = {
          code: "0001",
          message: "未找到该商品,无效商品id"
        };
    }
}

module.exports = {
    validatorParamsOrQuery,
    hasGoodsId
}
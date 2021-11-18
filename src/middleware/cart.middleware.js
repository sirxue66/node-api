const validatorAdd = async (ctx, next) => {
    try {
        ctx.verifyParams({
            goods_id: {type:'string',required:true},
        })
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

module.exports = {
    validatorAdd
}
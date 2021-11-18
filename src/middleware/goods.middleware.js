
const validators  = async(ctx,next) => {
    try {
        ctx.verifyParams({
            goods_name: {type:'string',required:true},
            goods_price: {type: 'string',required:true},
            goods_num: {type:'string',required:true},
            // goods_img: {type:'string',required:'false'},
            goods_type: {type: 'string',required:true}
        })
    } catch (err){
        console.error("添加商品参数错误",ctx.request.body);
        return  ctx.body = {
            code:"0001",
            message:"商品添加失败，参数错误",
            result: err
        };
    }

    await next();
}

module.exports = {
    validators
}
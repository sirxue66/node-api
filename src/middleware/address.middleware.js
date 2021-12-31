
const validatorParamsOrQuery = (rules) => {
    return async (ctx, next) => {
        try {
            let validate;
            if(rules === 'add'){
                validate = {
                    user_name: {type:'string',required:true},
                    user_phone: {type:'string',required:true},
                    user_address: {type:'string',required:true}
                };
            } else if(rules === 'remove'){
                validate = {
                    id: {type: 'string',required:true}
                };
            } else if(rules === 'update'){
                validate = {
                    id: {type:'string',required:true},
                    user_name: {type:'string',required:true},
                    user_phone: {type:'string',required:true},
                    user_address: {type:'string',required:true}
                };
            } else {
                validate = rules;
            }
            ctx.verifyParams(validate)
        } catch (err){
            console.error("添加收货地址参数错误",ctx.request.body);
            return  ctx.body = {
                code:"0001",
                message:"添加收货地址失败，参数错误",
                result: err
            };
        }

        await next();
    }
}

module.exports = {
    validatorParamsOrQuery
}
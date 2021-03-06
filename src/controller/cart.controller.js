const {creatOrUpdateCart, findCarts, updateCarts, removeCart, getCartsCountsService} = require("../service/carts.service")

class Carts {
    async addCart(ctx){
        const user_id = ctx.state.user.id * 1;
        const goods_id = ctx.request.body.goods_id * 1;
        console.log(user_id,goods_id);
        try {
            let res = await creatOrUpdateCart(user_id,goods_id);
            ctx.body = {
                code: "0000",
                message: "添加购物车成功",
                result: res
            };
        }catch (e) {
            console.error("添加购物车失败",e);
            ctx.app.emit('error',{
                code: "1001",
                message: "服务器错误，添加购物车失败"
            },ctx);
        }
    }

    async updateCart(ctx){
        let {id} = ctx.params;
        let {number, selected} = ctx.request.query;
        if(number === undefined && selected === undefined){
            return ctx.body = {
                code: "1001",
                message: "参数不能同时为空"
            };
        };
        try {
            let res = await updateCarts({id, number, selected});
            if(res !== '未找到该条数据'){
                ctx.body = {
                    code: '0000',
                    message: "购物车数据更新成功",
                    result: res
                };
            } else {
                ctx.body = {
                    code: "0001",
                    message: res
                };
            }
        } catch (e) {
            console.error("更新购物车失败",e);
            ctx.app.emit('error',{
                code: "1001",
                message: "服务器内部错误，更新购物车失败"
            },ctx)
        }
    }

    async getCarts(ctx){
        let user_id = ctx.state.user.id;
        let {pageNum = 1, pageSize = 10} = ctx.request.query;
        try {
            let res = await findCarts(pageNum, pageSize,user_id);
            ctx.body = {
                code: "0000",
                message: "获取成功",
                result: res
            };
        }catch (e) {
            console.error("获取购物车数据失败",e);
            ctx.app.emit('error',{
                code: "1001",
                message: "服务器错误，获取购物车失败"
            },ctx)
        }
    }

    async removeCarts(ctx){
        let ids = ctx.request.body.ids;
        try {
            let res = await removeCart(ids);
            if(res > 0){
                ctx.body = {
                    code: "0000",
                    message: "移除购物车成功",
                    result: res
                };
            } else {
                ctx.body = {
                  code: "0001",
                  message: "未找到数据，无效id"
                };
            }
        } catch (e) {
            console.log("删除购物车失败",e);
            ctx.app.emit('error',{
                code: "1001",
                message: "服务器错误，购物车删除失败"
            },ctx);
        }
    }

    async getCartsCounts(ctx){
        let user_id = ctx.state.user.id;
        try{
            let res = await getCartsCountsService(user_id);
            ctx.body = {
                code: "0000",
                message: "获取购物车数量成功",
                result: {
                    counts: res
                }
            };
        }
        catch (e) {
            console.log("获取购物车数量失败",e);
            ctx.app.emit('error',{
                code: "1001",
                message: "服务器错误，购物车数量获取失败"
            },ctx);
        }
    }

}

module.exports = new Carts();
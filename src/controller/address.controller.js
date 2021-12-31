const {addAddressService, removeAddressService, updateAddressService, getAddressService} = require('../service/address.service')

class AddressController {
    async addAddressController(ctx){
        let params = ctx.request.body;
        let user_id = ctx.state.user.id;
        Object.assign(params,{user_id:user_id});
        // let a = Object.assign({},params,{user_id:user_id});
        console.log("添加参数",params);
        try {
            let res = await addAddressService(params);
            ctx.body = {
                code: '0000',
                message: "添加地址成功",
                result: res
            };
        }
        catch (e) {
            console.error("添加收货地址失败", e);
            ctx.app.emit('error',{
                code: '1001',
                message: '添加地址失败，内部服务器错误'
            },ctx);
        }
    }

    async removeAddressController(ctx){
        let id = ctx.request.body.id;
        try {
            let res = await removeAddressService(id);
            if(res){
                ctx.body = {
                    code: "0000",
                    message: "地址删除成功"
                };
            } else {
                ctx.body = {
                    code: '0002',
                    message: "地址删除失败，无效地址id"
                };
            }
        } catch (e) {
            console.log("删除地址失败",e);
            ctx.app.emit('error',{
                code: '1001',
                message: "地址删除失败，内部服务器错误"
            },ctx);
        }
    }

    async updateAddressController(ctx){
        let params = ctx.request.body;
        console.log('更新地址参数',params);
        try {
            let res = await updateAddressService(params);
            if(res){
                ctx.body = {
                    code: '0000',
                    message: '地址更新成功',
                    result: params
                };
            } else {
                ctx.body = {
                    code: '0001',
                    message: '地址更新失败，无效地址id'
                };
            }
        }
        catch (e) {
            console.error("更新地址报错",e);
            ctx.app.emit('error',{
                code: '1001',
                message: "地址更新失败，内部服务器错误"
            },ctx);
        }
    }

    async getAddressController(ctx){
        let user_id = ctx.state.user.id;
        try {
            let res = await getAddressService(user_id);
            ctx.body = {
                code: '0000',
                message: '获取地址成功',
                result: res
            };
        }
        catch (e) {
        console.log('获取用户信息报错',e);
        ctx.app.emit('error',{
            code: '1001',
            message: '获取用户地址失败，内部服务器错误'
        },ctx);
        }
    }
}

module.exports = new AddressController();
const path = require("path")
const {addG, updateG, removeG, deleteG, restoreG, getG} = require("../service/goods.service")

class Goods {

    async upload(ctx,next){
        const fileTypes = ['image/png','image/jpeg','image/jpg'];
        const {file} = ctx.request.files;
        console.log("图片文件",file);
        if(file) {
            if(Number(file.size) > 100000){
                ctx.body = {
                    code: "0003",
                    message: "文件过大，上传失败"
                };
            }
            else if(fileTypes.indexOf(file.type) < 0){
                ctx.body = {
                    code: "0004",
                    message: "文件类型错误，请选择图片文件,只支持png，jpeg，jpe格式"
                };
            }
            else {
                ctx.body ={
                    code: "0000",
                    message: "图片上传成功",
                    result: {
                        goods_img: path.basename(file.path)     //使用path.basename 将文件名取到
                    }
                }
            }
        } else {
            ctx.body = {
                code:"0002",
                message: "请选择上传文件"
            };
        }
    }

    async addGoods(ctx,next){
        try {
            let res = await addG(ctx.request.body);

            ctx.body = {
                code: "0000",
                message: "商品添加成功",
                result: res
            };
        }catch (e) {
            console.error("添加商品失败",e);
            ctx.app.emit('error',{
                code: "1001",
                message: "服务器出错，添加商品失败"
            },ctx);
        }
    }

    async updateGoods(ctx){
        let id = ctx.params.id;
        try {
            let res = await updateG(id, ctx.request.body);
            if(res){
                ctx.body = {
                    code: "0000",
                    message: "修改商品成功"
                };
            } else {
                ctx.body = {
                  code: "0001",
                  message: "未找到该商品，无效id"
                };
            }
        }
        catch (e) {
            console.error("修改商品失败",e);
            ctx.app.emit('error',{
                code: "1001",
                message: "服务器出错，修改商品失败"
            },ctx);
        }
    }

    async removeGoods(ctx){
        let id = ctx.params.id;
        try {
            let res = await removeG(id);
            if(res){
                ctx.body = {
                    code: "0000",
                    message: "删除商品成功"
                };
            } else {
                ctx.body = {
                    code: "0001",
                    message: "未找到该商品，无效id"
                };
            }
        }
        catch (e) {
            console.error("删除商品失败",e);
            ctx.app.emit('error',{
                code: "1001",
                message: "服务器出错，删除商品失败"
            },ctx);
        }
    }

    async deleteGoods(ctx){
        let id = ctx.params.id;
        try {
            let res = await deleteG(id);
            if(res){
                ctx.body = {
                    code: "0000",
                    message: "下架商品成功"
                };
            }
            else {
                ctx.body = {
                    code: "0001",
                    message: "未找到该商品，无效id"
                };
            }
        }
        catch (e) {
            console.error("下架商品失败",e);
            ctx.app.emit('error',{
                code: "1001",
                message: "服务器错误，下架商品失败"
            },ctx);
        }
    }

    async restoreGoods(ctx){
        let id = ctx.params.id;
        try {
            let res = await restoreG(id);
            if(res){
                ctx.body = {
                    code: "0000",
                    message: "上架商品成功"
                };
            }
            else {
                ctx.body = {
                    code: "0001",
                    message: "未找到该商品，无效id"
                };
            }
        }
        catch (e) {
            console.error("上架商品失败",e);
            ctx.app.emit('error',{
                code: "1001",
                message: "服务器错误，上架商品失败"
            },ctx);
        }
    }

    async getGoods(ctx){
        const {pageNum = 1,pageSize = 10} = ctx.request.query;
        try {
            let res = await getG(pageNum,pageSize);
            ctx.body = {
                code: "0000",
                message: "获取商品列表成功",
                result: res
            };
        }
        catch (e) {
            console.error("获取商品列表失败",e);
            ctx.app.emit('error',{
                code: "1001",
                message: "服务器错误，获取商品列表失败"
            },ctx);
        }
    }
}

module.exports = new Goods();
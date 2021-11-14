const path = require("path")

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
        let {goods_name,goods_price,goods_num,goods_img} = ctx.request.body;

    }
}

module.exports = new Goods();
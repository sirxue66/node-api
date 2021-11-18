const Goods = require("../model/goods.model")

class GoodsService{
    async addG(obj){
        let res = await Goods.create(obj);
        return res.dataValues;
    }

    async updateG(id,obj){
        let res = await Goods.update(obj, {
            where: {id}
        });
        return res[0] > 0 ? true :false;
    }

    //强制删除（直接删除数据）
    async removeG(id){
        let res = await Goods.destroy({
            where: {id},
            force: true
        });
        return res > 0 ? true : false;
    }

    //软删除,下架商品（只是改变删除的标识，并不删除数据库数据）
    async deleteG(id){
        let res = await Goods.destroy({
            where: {id}
        });
        return res > 0 ? true : false;
    }

    //上架商品
    async restoreG(id){
        let res = await Goods.restore({
            where: {id}
        });
        return res > 0 ? true : false;
    }

    //获取商品列表
    async getG(pageNum,pageSize){
        let count = await Goods.count();     //获取总数，会自动将下架数据排除
        let offset = (pageNum - 1) * pageSize;
        let limit = pageSize * 1;
        let res = await Goods.findAll({offset,limit});
        // console.log("获取商品",res);
        let goods = res.map(item => {
            let {deletedAt, ...endRes} = item.dataValues;
            return endRes;
        });
        return {
            pageNum,
            pageSize,
            total: count,
            list: goods
        };
    }
}

module.exports = new GoodsService()
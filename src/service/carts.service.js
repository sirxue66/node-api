const Carts = require("../model/carts.model")
const { Op } = require('sequelize')
const Goods = require("../model/goods.model")

class Cart{
    async creatOrUpdateCart(user_id,goods_id){
        let res = await Carts.findOne({
            where: {
                [Op.and]: {
                    user_id: user_id,
                    goods_id: goods_id
                },
            }
        });
        //如果res不为null，数量加1，否则创建一条数据
        if(res){
            await res.increment('number',{by: 1});   //执行加1操作
            return await res.reload();       //返回加一之后的数据
        } else {
            return await Carts.create({
                goods_id,
                user_id
            });
        }
    }

    async findCarts(pageNum, pageSize, user_id){
        let offset = (pageNum-1) * pageSize;
        let res = await Carts.findAndCountAll({
            attributes:['id', 'number', 'selected'],
            offset: offset,
            limit: pageSize*1,
            include: {      //联表查询
                model: Goods,
                as: 'goodsInfo',
                attributes: ['id','goods_name','goods_price','goods_img']
            },
            where: {
                user_id
            }
        });
        let {count, rows} = res;
        return {
            pageNum,
            pageSize,
            total: count,
            list: rows
        };
    }

    async updateCarts(obj){
        let {id, number, selected} = obj;
        let res = await Carts.findByPk(id);
        if(!res) return "未找到该条数据"

        number !== undefined ? res.number = number : '';
        selected !== undefined ? res.selected = selected : '';

        let endRes = await res.save();   //更新完数据，保存数据
        return endRes;
    }
}

module.exports = new Cart()
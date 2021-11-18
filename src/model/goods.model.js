const {DataTypes} = require("sequelize")
const seq = require("../db/seq")

const Goods = seq.define("node_good",
    {
        goods_name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "商品名称"
        },
        goods_price: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            comment: "商品价格"
        },
        goods_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "商品数量"
        },
        goods_img: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "商品图片"
        },
        goods_type: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "商品分类"
        }
    },
    {paranoid: true}    //自定添加软删除字段
)
// Goods.sync({force: true});        //生成表

module.exports = Goods
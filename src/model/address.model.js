const {DataTypes} = require('sequelize')
const seq = require('../db/seq')

const Address = seq.define('node_address',{
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "用户id"
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '用户名'
    },
    user_phone: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '用户手机号'
    },
    user_address: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '收货地址'
    }
})

// Address.sync({force: true});

module.exports = Address;
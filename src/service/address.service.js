const Address = require('../model/address.model')

class AddressService {
    async addAddressService(params){
        let res = await Address.create({...params});
        return res.dataValues;
    }

    async removeAddressService(id){
        let res = await Address.destroy({
            where: {id}
        });
        return res > 0 ? true : false;
    }

    async updateAddressService(params){
        let {id, ...obj} = params;
        let res = await Address.update(obj, {
            where: {id}
        });
        // console.log("修改地址结果",res);
        return res[0] > 0 ? true : false;
    }

    async getAddressService(id){
        let count = await Address.count();
        let res = await Address.findAll({
            where: {user_id: id}
        });
        // console.log('获取用户地址列表',count,res);
        let addresses = res.map(item => {
            let {dataValues} = item;
            return dataValues;
        });
        return {
            total: count,
            list: addresses
        };
    }
}

module.exports = new AddressService();
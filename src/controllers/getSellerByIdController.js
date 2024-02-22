const { Seller } = require('../db').conn.models;

const getSellerById = async (sellerId) => {
    const seller = await Seller.findByPk(sellerId);
    return seller;
};

module.exports = { getSellerById };

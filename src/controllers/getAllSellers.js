const { Seller } = require('../db').conn.models;

const getAllSellers = async () => {
    const sellers = await Seller.findAll();
    return sellers;
};

module.exports = { getAllSellers };

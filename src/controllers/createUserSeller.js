const { Seller } = require('../db').conn.models;

const createUserSeller = async (userData) => {
    const seller = await Seller.create(userData);
    return seller;
};

module.exports = { createUserSeller };

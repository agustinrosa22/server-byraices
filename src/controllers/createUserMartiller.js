const { Martiller } = require('../db').conn.models;

const createUserMartiller = async (userData) => {
    const martiller = await Martiller.create(userData);
    return martiller;
};

module.exports = { createUserMartiller };

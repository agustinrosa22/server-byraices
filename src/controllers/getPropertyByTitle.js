const { Op } = require('sequelize');
const { Property } = require('../db').conn.models;

const getPropertyByTitle = async (title) => {
    const property = await Property.findOne({ where: { title: { [Op.iLike]: `%${title}%` } } });
    return property;
};

module.exports = { getPropertyByTitle };


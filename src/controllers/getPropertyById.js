const { Property } = require('../db').conn.models;

const getPropertyById = async (id) => {
        const property = await Property.findByPk(id);
        return property;
};

module.exports = {getPropertyById};

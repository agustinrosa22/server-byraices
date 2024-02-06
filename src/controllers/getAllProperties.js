const { Property } = require('../db').conn.models;

const getAllProperties = async () => {
    try {
        const properties = await Property.findAll();
        return properties;
    } catch (error) {
        throw new Error(`Error fetching properties: ${error.message}`);
    }
};

module.exports = {
    getAllProperties,
};

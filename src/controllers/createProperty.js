const { Property } = require('../db').conn.models;
require('dotenv').config()

const createProperty = async ({
    propertyType,
    photo,
    videoLink,
    status,
    price,
    expenses,
    totalSquareMeters,
    coveredSquareMeters,
    age,
    sellerCommission,
    buyerCommission,
    availableDate,
    expirationDate,
    location,
    surface,
    propertyState,
    roomsOptions,
    amenitiesOptions,
    servicesOptions,
    title,
    description,
    floorPlans,
    documentation,
    sellerId
}) => {
    const created = await Property.create({
        propertyType,
        photo,
        videoLink,
        status,
        price,
        expenses,
        totalSquareMeters,
        coveredSquareMeters,
        age,
        sellerCommission,
        buyerCommission,
        availableDate,
        expirationDate,
        location,
        surface,
        propertyState,
        roomsOptions,
        amenitiesOptions,
        servicesOptions,
        title,
        description,
        floorPlans,
        documentation,
        sellerId
    });
    return created;
};

module.exports = {
    createProperty
};
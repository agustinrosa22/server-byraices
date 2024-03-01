const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Property = sequelize.define('Property', {
    propertyType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
    },
    videoLink: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
    currency: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currencyExpenses: {
      type: DataTypes.STRING,
    },
    expenses: {
      type: DataTypes.STRING,
    },
    totalSquareMeters: {
      type: DataTypes.INTEGER,
    },
    coveredSquareMeters: {
      type: DataTypes.INTEGER,
    },
    semiCoveredSquareMeters: {
      type: DataTypes.INTEGER,
    },
    uncovered: {
      type: DataTypes.INTEGER,
    },
    land: {
      type: DataTypes.INTEGER,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    commissionSellerType: {
      type: DataTypes.STRING,
    },
    sellerCommission: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    commissionBuyerType: {
      type: DataTypes.STRING,
    },
    buyerCommission: {
      type: DataTypes.DECIMAL(5, 2),
    },
    availableDate: {
      type: DataTypes.STRING, // Usa STRING en lugar de DATE
      defaultValue: () => {
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
        return formattedDate;
      },
    },
    expirationDate: {
      type: DataTypes.STRING, // Usa STRING en lugar de DATE
      defaultValue: () => {
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
        return formattedDate;
      },
    },
    street: {
      type: DataTypes.STRING,
    },
    number: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    province: {
      type: DataTypes.STRING,
    },
    departments: {
      type: DataTypes.STRING,
    },
    locality: {
      type: DataTypes.STRING,
    },
    neighborhood: {
      type: DataTypes.STRING,
    },
    privateNeighborhood: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    environments: {
      type: DataTypes.STRING,
    },
    rooms: {
      type: DataTypes.STRING,
    },
    bathrooms: {
      type: DataTypes.STRING,
    },
    toilettes: {
      type: DataTypes.STRING,
    },
    garages: {
      type: DataTypes.STRING,
    },
    propertyState: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
    amenitiesOptions: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
    servicesOptions: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    floorPlans: {
      type: DataTypes.STRING,
    },
    documentation: {
      type: DataTypes.STRING,
    },
    isForSale: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isForRent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isFinished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    exclusiveContract: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    cartel: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    financing: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    suitableCredit: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    commercialSuitable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    professionalSuitable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    suitableForReducedMobility: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    pozo: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    CountryOrPrivateNeighborhood: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  return Property;
};

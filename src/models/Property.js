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
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    expenses: {
      type: DataTypes.DECIMAL(10, 2),
    },
    totalSquareMeters: {
      type: DataTypes.INTEGER,
    },
    coveredSquareMeters: {
      type: DataTypes.INTEGER,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    sellerCommission: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
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
    location: {
      type: DataTypes.STRING,
    },
    surface: {
      type: DataTypes.STRING,
    },
    propertyState: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
    roomsOptions: {
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
  });

  return Property;
};

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Office = sequelize.define('Office', {
    image: {
        type: DataTypes.STRING, 
      },
    name: {
        type: DataTypes.STRING, 
      },
      location: {
        type: DataTypes.ARRAY(DataTypes.STRING),
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
      phone_number: {
        type: DataTypes.STRING,
      },
      disclaimer: {
        type: DataTypes.STRING,
      },
  });

  return Office;
};

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Seller = sequelize.define('Seller', {
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Vendedor",
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    rank: {  // 📌 Nuevo campo para la jerarquía
      type: DataTypes.ENUM("Agente BY", "Middle BY", "Top BY"),
      allowNull: false,
      defaultValue: "Agente BY",
    },
  });

  return Seller;
};

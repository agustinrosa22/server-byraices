const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Franquicia = sequelize.define('Franquicia', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING, // URL o ruta de la imagen
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mail: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
    },
  }, {
    timestamps: false,
  });

  return Franquicia;
};

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Rental = sequelize.define('Rental', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,

      primaryKey: true,
    },
    rentValue: {
      type: DataTypes.FLOAT,
    
      validate: {
        isFloat: true,
        min: 0,
      },
    },
    contractStart: {
      type: DataTypes.DATE,
    
    },
    contractEnd: {
      type: DataTypes.DATE,

    },
    paymentDueDate: {
      type: DataTypes.DATEONLY,

    },
    incrementRate: {
      type: DataTypes.FLOAT,
      validate: {
        isFloat: true,
        min: 0,
      },
      comment: 'Optional: Percentage increase for rent adjustments.',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      comment: 'Indicates if the rental is active or terminated.',
    },
    documentRent: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
  });

  return Rental;
};

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Visita = sequelize.define('Visita', {
    visitante: {
      type: DataTypes.STRING,
      allowNull: false,  // El visitante es obligatorio
    },
    agente: {
      type: DataTypes.STRING,
      allowNull: false,  // El agente es obligatorio
    },
    fecha: {
      type: DataTypes.STRING, // Usa STRING en lugar de DATE
      allowNull: false,
      defaultValue: () => {
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
        return formattedDate;
      },
    },
    descripcion: {
      type: DataTypes.TEXT,  // Texto más largo para la descripción
      allowNull: true,  // Puede ser opcional
    },
  });

  return Visita;
};

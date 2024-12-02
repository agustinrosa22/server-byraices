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
    gusto: {
      type: DataTypes.JSON, // Usamos JSON para guardar yes y no
      allowNull: false,
      defaultValue: {
        yes: false,
        no: false,
      },
    },
    calificacionUbicacion: {
      type: DataTypes.JSON, // Usamos JSON para guardar las opciones de calificación
      allowNull: false,
      defaultValue: {
        excelente: false,
        buena: false,
        regular: false,
        mala: false,
      },
    },
    espaciosYComodidades: {
      type: DataTypes.JSONB,
      defaultValue: {
        muySatisfactorio: false,
        satisfactorio: false,
        insatisfactorio: false
      }
    },
    calidadPrecio: {
      type: DataTypes.JSONB,
      defaultValue: {
        excelente: false,
        buena: false,
        regular: false,
        mala: false,
      }
    },
    general: {
      type: DataTypes.JSONB,
      defaultValue: {
        excelente: false,
        muyBuena: false,
        buena: false,
        regular: false,
        mala: false,
      }
    },
    comprar: {
      type: DataTypes.JSON, // Usamos JSON para guardar yes y no
      allowNull: false,
      defaultValue: {
        yes: false,
        no: false,
      },
    },
    comprar: {
      type: DataTypes.JSON, // Usamos JSON para guardar yes y no
      allowNull: false,
      defaultValue: {
        yes: false,
        no: false,
        maybe: false,
      },
    },
  });

  return Visita;
};

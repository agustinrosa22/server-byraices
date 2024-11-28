const { Op } = require('sequelize');
const { Property } = require('../db').conn.models;

// Función para obtener el nombre del mes en español
const getMonthName = (date) => {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  const monthNumber = new Date(date).getUTCMonth();
  return months[monthNumber];
};

const getPropertiesCountByMonth = async (req, res) => {
  try {
    const propertiesByMonth = await Property.findAll({
      where: {
        statusProperty: true,
        createdAt: {
          [Op.gte]: new Date('2024-01-01T00:00:00Z'),
          [Op.lt]: new Date('2025-01-01T00:00:00Z')
        }
      },
      attributes: [
        [Property.sequelize.fn('date_trunc', 'month', Property.sequelize.col('createdAt')), 'month'],
        [Property.sequelize.fn('COUNT', Property.sequelize.col('id')), 'count'],
      ],
      group: ['month'],
      order: [[Property.sequelize.literal('month'), 'ASC']]
    });

    const formattedData = propertiesByMonth.map(record => ({
      month: record.get('month'),
      monthName: getMonthName(record.get('month')), // Nombre del mes
      count: parseInt(record.get('count')),
    }));

    // Calcular el total de propiedades
    const totalProperties = formattedData.reduce((total, record) => total + record.count, 0);

    return res.status(200).json({
      total: totalProperties,
      propertiesByMonth: formattedData
    });
  } catch (error) {
    console.error('Error al obtener la cantidad de propiedades por mes:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {
  getPropertiesCountByMonth
};

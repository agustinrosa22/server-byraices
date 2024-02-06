const { getPropertyById } = require('../controllers/getPropertyById')

const getPropertyByIdHandler = async (req, res) => {
    const propertyId = req.params.id;
    try {
        const property = await getPropertyById(propertyId)
        if (!property) {
            return res.status(404).json({
              success: false,
              message: 'Propiedad no encontrada',
            });
          }
          res.status(200).json({
            success: true,
            message: 'Propiedad obtenida exitosamente',
            data: property,
          })
    } catch (error) {
        console.error('Error al obtener producto por ID:', error.message);
        res.status(500).json({
          success: false,
          message: 'Error al obtener producto por ID',
        });
      }
    }
module.exports = {getPropertyByIdHandler}

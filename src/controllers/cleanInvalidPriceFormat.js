const { Property } = require('../db').conn.models;
const { Op } = require('sequelize');

const cleanInvalidPriceFormat = async (req, res) => {
    try {
        // Encuentra todas las propiedades donde el precio contiene un punto "."
        const propertiesWithInvalidPrice = await Property.findAll({
            where: {
                price: {
                    [Op.iLike]: '%.%'  // Coincide con cualquier valor que contenga un punto
                }
            },
            attributes: ['id', 'price']  // Trae solo el ID y el precio para verificación
        });

        // Verifica si se encontraron propiedades con precios que contienen puntos
        if (propertiesWithInvalidPrice.length === 0) {
            return res.status(200).json({ message: "No se encontraron propiedades con formato de precio inválido" });
        }

        // Recorre las propiedades encontradas, elimina el punto en el precio y actualiza en la base de datos
        for (const property of propertiesWithInvalidPrice) {
            const cleanPrice = property.price.replace(/\./g, '');  // Elimina todos los puntos
            await property.update({ price: cleanPrice });  // Actualiza el registro con el nuevo valor de precio
        }

        // Devuelve una respuesta con los ID de las propiedades actualizadas
        return res.status(200).json({
            message: "Formato de precio inválido corregido en las propiedades",
            updatedProperties: propertiesWithInvalidPrice.map(p => ({ id: p.id, oldPrice: p.price, newPrice: p.price.replace(/\./g, '') }))
        });
    } catch (error) {
        console.error("Error al limpiar el formato de precio inválido:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

module.exports = {
    cleanInvalidPriceFormat
};

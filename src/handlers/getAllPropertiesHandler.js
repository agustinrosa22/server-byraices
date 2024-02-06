const { getAllProperties } = require('../controllers/getAllProperties');

const getAllPropertiesHandler = async (req, res) => {
    try {
        const properties = await getAllProperties();
        res.status(200).json({
            success: true,
            message: 'Properties retrieved successfully',
            data: properties,
        });
    } catch (error) {
        console.error('Error fetching properties:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error fetching properties',
        });
    }
};

module.exports = {
    getAllPropertiesHandler,
};

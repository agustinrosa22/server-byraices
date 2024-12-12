const { Rental, Property } = require('../db').conn.models;

const getAllRentals = async (req, res) => {
  try {
    const rentals = await Rental.findAll({
      include: {
        model: Property,
        as: 'property',
      },
    });
    res.status(200).json(rentals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching rentals', error });
  }
};



module.exports = {
  getAllRentals
};
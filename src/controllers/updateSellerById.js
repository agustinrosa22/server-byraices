const { Seller } = require('../db').conn.models;


// Editar los datos de un usuario por ID
const updateSellerById = async (req, res) => {
    const { id } = req.params;
    const { mail, password, name, last_name, phone_number, photo, type, status, officeId } = req.body;
  
    try {
      // Buscar el vendedor por ID
      const seller = await Seller.findByPk(id);
  
      if (!seller) {
        return res.status(404).json({ message: 'Vendedor no encontrado' });
      }
  
      // Actualizar los campos del vendedor
      if (mail !== undefined) seller.mail = mail;
      if (password !== undefined) seller.password = password;
      if (name !== undefined) seller.name = name;
      if (last_name !== undefined) seller.last_name = last_name;
      if (phone_number !== undefined) seller.phone_number = phone_number;
      if (photo !== undefined) seller.photo = photo;
      if (type !== undefined) seller.type = type;
      if (status !== undefined) seller.status = status;
      if (officeId !== undefined) seller.officeId = officeId;
  
      // Guardar los cambios
      await seller.save();
  
      res.status(200).json(seller);
    } catch (error) {
      console.error('Error al actualizar el vendedor:', error);
      res.status(500).json({ message: 'Error al actualizar el vendedor', error });
    }
  };
  
  module.exports = {
    updateSellerById,
  };
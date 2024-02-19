const { Admin, Martiller, Seller } = require('../db').conn.models; // Importa los modelos de Admin, Martiller y Seller desde donde sea que estén ubicados en tu aplicación

const loginController = {
  async login(req, res) {
    try {
      const { mail, password } = req.body; // Suponiendo que el correo electrónico y la contraseña se envían en el cuerpo de la solicitud

      // Verifica si el usuario es un Admin
      let user = await Admin.findOne({ where: { mail } });
      if (user) {
        if (user.password === password) {
          return res.status(200).json({ access: true, user });
        } else {
          return res.status(401).json({ message: 'Credenciales inválidas' });
        }
      }

      // Verifica si el usuario es un Martiller
      user = await Martiller.findOne({ where: { mail } });
      if (user) {
        if (user.password === password) {
          return res.status(200).json({ access: true, user });
        } else {
          return res.status(401).json({ message: 'Credenciales inválidas' });
        }
      }

      // Verifica si el usuario es un Seller
      user = await Seller.findOne({ where: { mail } });
      if (user) {
        if (user.password === password) {
          return res.status(200).json({ access: true, user });
        } else {
          return res.status(401).json({ message: 'Credenciales inválidas' });
        }
      }

      // Si el usuario no se encuentra en ninguno de los modelos
      return res.status(404).json({ message: 'Usuario no encontrado' });
    } catch (error) {
      console.error('Error en el controlador de login:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
};

module.exports = loginController;

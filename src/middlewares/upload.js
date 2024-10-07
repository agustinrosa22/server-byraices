const multer = require('multer');
const path = require('path');

// Configuración de multer para almacenar imágenes en la carpeta "uploads"
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Renombrar archivo con un sufijo único
    }
});

const upload = multer({ storage: storage });

module.exports = upload;

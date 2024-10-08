const multer = require('multer');
const path = require('path');

// Configuración de multer para almacenar imágenes y documentación en la carpeta "uploads"
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes y documentos
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Renombrar archivo con un sufijo único
    }
});

// Middleware para manejar fotos, documentación y la imagen del martillero
const upload = multer({ storage: storage }).fields([
    { name: 'photo', maxCount: 30 },        // Acepta hasta 30 fotos
    { name: 'documentation', maxCount: 10 }, // Acepta hasta 10 archivos de documentación
    { name: 'img', maxCount: 1 },   
    { name: 'photo', maxCount: 1 },             
]);

module.exports = upload;

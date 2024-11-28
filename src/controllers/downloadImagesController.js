const axios = require('axios');
const AdmZip = require('adm-zip');
const path = require('path');

async function downloadImagesHandler(req, res) {
  const URL_ENDPOINT = 'https://homedeco.naranjointeriores.com.ar/product';

  try {
    // 1. Obtén los datos de los productos
    const response = await axios.get(URL_ENDPOINT);
    
    // Verifica que productos esté presente en la respuesta
    if (!response.data) {
      return res.status(500).send('No se encontró la clave "productos" en la respuesta');
    }

    const productos = response.data.data; // Cambia esto según la estructura del JSON

    // 2. Crea el archivo ZIP
    const zip = new AdmZip();

    // Función para descargar la imagen con reintento
    const downloadImageWithRetry = async (url, retries = 3) => {
      try {
        const imagenRespuesta = await axios.get(url, { responseType: 'arraybuffer', timeout: 10000 });
        return imagenRespuesta.data;
      } catch (error) {
        if (retries === 0) throw error;
        console.warn(`Reintentando descarga de ${url}. Intentos restantes: ${retries}`);
        return downloadImageWithRetry(url, retries - 1);
      }
    };

    // 3. Crea un array de promesas para descargar las imágenes
    const downloadPromises = productos.map(async (producto) => {
      const urlImagen = producto.image; // URL de la imagen
      const nombreArchivo = urlImagen ? path.basename(urlImagen) : null; // Extrae el nombre del archivo desde la URL si existe
      
      // Asegúrate de que urlImagen sea válido
      if (urlImagen) {
        try {
          const imagenData = await downloadImageWithRetry(urlImagen); // Llama a la función con reintento
          zip.addFile(nombreArchivo, imagenData);
        } catch (imgError) {
          console.error(`Error al descargar la imagen de ${urlImagen}:`, imgError.message);
        }
      } else {
        console.log(`No hay imagen para el producto ${producto.nombreProducto}, se saltará.`);
      }
    });

    // Espera a que todas las promesas se resuelvan
    await Promise.all(downloadPromises);

    // 4. Enviar el ZIP como respuesta
    const zipBuffer = zip.toBuffer();
    res.set({
      'Content-Type': 'application/zip',
      'Content-Disposition': 'attachment; filename=imagenes_productos.zip',
      'Content-Length': zipBuffer.length,
    });
    res.send(zipBuffer);

  } catch (error) {
    console.error('Error al descargar imágenes:', error.message);
    res.status(500).send('Hubo un error al descargar las imágenes');
  }
}

module.exports = { downloadImagesHandler };

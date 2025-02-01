const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const routes = require('./routes/index.js');

require('./db.js');

const server = express();

server.name = 'API';


// 🔹 Habilita CORS para permitir peticiones desde tu frontend
server.use(cors({ 
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'https://redbyraices.com', 'https://www.redbyraices.com','https://byraices.com', 'https://www.byraices.com'], // Agrega los dominios permitidos // Especifica el dominio del frontend
  credentials: true, // Permitir envío de cookies y headers de autenticación
  methods: 'GET, POST, OPTIONS, PUT, DELETE',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
}));
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// Configurar Express para servir archivos estáticos desde la carpeta "uploads"
server.use(express.static('uploads'));
server.use('/uploads', express.static((__dirname, 'uploads'))); // <-- Agrega esta línea


server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;

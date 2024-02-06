// db.js
require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/byraices`, {
  logging: false,
  native: false,
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    try {
      modelDefiners.push(require(path.join(__dirname, '/models', file)));
    } catch (error) {
      console.error(`Error importing model from file ${file}:`, error);
    }
  });

// Importar y definir los modelos
const models = modelDefiners.map(modelDefiner => modelDefiner(sequelize));

// Establecer relaciones
Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

// Capitalizamos los nombres de los modelos
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// Destructuring para acceder a los modelos
const { Seller, Property, Martiller } = sequelize.models;

// Aca vendrian las relaciones

// Relacionar propiedades a vendedores
Seller.hasMany(Property, { as: 'properties', foreignKey: 'sellerId' });
Property.belongsTo(Seller, { foreignKey: 'sellerId' });

// Relacionar vendedores a martilleros
Martiller.hasMany(Seller, { as: 'sellers', foreignKey: 'martillerId' });
Seller.belongsTo(Martiller, { foreignKey: 'martillerId' });

// Exportar modelos y conexión
module.exports = {
  ...models,
  conn: sequelize,
};

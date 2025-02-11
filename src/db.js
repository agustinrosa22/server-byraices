// db.js
require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY, DB_PORT, DB_NAME
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/byraices`, {
  logging: false,
  native: false,
  operatorsAliases: false,
});

// const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
//   host: DB_HOST,
//   dialect: 'mysql',
//   user: DB_USER,
//   password: DB_PASSWORD,
//   database: DB_NAME
// });


// Prueba de conexión
sequelize.authenticate()
  .then(() => {
    console.log('Conectado a la base de datos.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
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
const { Seller, Property, Martiller, User, Franquicia, UserSeller, Office, Visita, Rental} = sequelize.models;

// Aca vendrian las relaciones

// Relacionar Franquicia con Martiller (un Martiller puede tener varias franquicias)
Franquicia.hasMany(Martiller, { as: 'martillers', foreignKey: 'franquiciaId' });
Martiller.belongsTo(Franquicia, { foreignKey: 'franquiciaId' });

// Relacionar Franquicia con Seller (una Franquicia puede tener varios Sellers)
Franquicia.hasMany(Seller, { as: 'sellers', foreignKey: 'franquiciaId' });
Seller.belongsTo(Franquicia, { foreignKey: 'franquiciaId' });

// Relacionar Franquicia con Property (una Franquicia puede tener varias propiedades)
Franquicia.hasMany(Property, { as: 'properties', foreignKey: 'franquiciaId' });
Property.belongsTo(Franquicia, { foreignKey: 'franquiciaId' });

// Relacionar propiedades a vendedores
Seller.hasMany(Property, { as: 'properties', foreignKey: 'sellerId' });
Property.belongsTo(Seller, { foreignKey: 'sellerId' });

// Relacionar vendedores a martilleros
Martiller.hasMany(Seller, { as: 'sellers', foreignKey: 'martillerId' });
Seller.belongsTo(Martiller, { foreignKey: 'martillerId' });

// Relacionar usuarios a propiedades
User.hasMany(Property, { as: 'properties', foreignKey: 'userId' });
Property.belongsTo(User, { foreignKey: 'userId' });

// Office puede tener muchas propiedades
Office.hasMany(Property, { as: 'properties', foreignKey: 'officeId' });
Property.belongsTo(Office, { foreignKey: 'officeId' });

// Office puede tener varios martilleros
Office.hasMany(Martiller, { as: 'martillers', foreignKey: 'officeId' });
Martiller.belongsTo(Office, { foreignKey: 'officeId' });

// Office puede tener varios agentes/vendedores
Office.hasMany(Seller, { as: 'sellers', foreignKey: 'officeId' });
Seller.belongsTo(Office, { foreignKey: 'officeId' });

// Office puede tener varios usuarios
Office.hasMany(User, { as: 'users', foreignKey: 'officeId' });
User.belongsTo(Office, { foreignKey: 'officeId' });

// Office puede tener varias franquicias
Office.hasMany(Franquicia, { as: 'franquicias', foreignKey: 'officeId' });
Franquicia.belongsTo(Office, { foreignKey: 'officeId' });

// Office puede tener varios UserSeller
Office.hasMany(UserSeller, { as: 'userSellers', foreignKey: 'officeId' });
UserSeller.belongsTo(Office, { foreignKey: 'officeId' });

// Relacionar propiedades a martilleros
Martiller.hasMany(Property, { as: 'properties', foreignKey: 'martillerId' });
Property.belongsTo(Martiller, { foreignKey: 'martillerId' });

// Relacionar Property con Visita (uno a muchos)
Property.hasMany(Visita, { as: 'visitas', foreignKey: 'propertyId' });
Visita.belongsTo(Property, { foreignKey: 'propertyId' });

// Relación uno a uno entre Property y Rental
Property.hasOne(Rental, { as: 'rental', foreignKey: 'propertyId' });
Rental.belongsTo(Property, { as: 'property', foreignKey: 'propertyId' });


// Exportar modelos y conexión
module.exports = {
  ...models,
  conn: sequelize,
};

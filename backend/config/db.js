const { Sequelize } = require('sequelize');
require('dotenv').config();

const db = new Sequelize( process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false , // true pour voir les logs SQL
    dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
        }
      }
});

module.exports = db;

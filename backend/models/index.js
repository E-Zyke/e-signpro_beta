const { Sequelize } = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

const Convention = require('./Convention');

module.exports = {
  db,
  Convention,
};

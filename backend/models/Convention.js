// models/Convention.js
const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Convention = db.define('Convention', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  data: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  pdfUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  statut: {
    type: DataTypes.STRING,
    defaultValue: 'en_attente'
  },
  signatures: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {}
  },
  dateCreation: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'conventions',
  timestamps: false
});

module.exports = Convention;

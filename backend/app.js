const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const conventionRoutes = require('./routes/conventions.routes');
const signaturesRoutes = require('./routes/signatures.routes');

const db = require('./config/db');

// Initialisation de la base de données
db.authenticate()
  .then(() => {
    console.log('✅ Connexion PostgreSQL réussie');
    return db.sync();
  })
  .then(() => console.log('🗃️ Table sync OK'))
  .catch(err => console.error('❌ Erreur connexion DB', err));

// Miiddleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use('/api/conventions', conventionRoutes);
app.use('/api/signatures', signaturesRoutes);
app.use('/pdfs', express.static('pdfs'));


app.get('/', (req, res) => {
  res.send('E-Sign PRO API is running ✅');
});
module.exports = app;

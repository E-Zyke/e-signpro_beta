const express = require('express');
const cors = require('cors');


const app = express();

// Miiddleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes

app.use('/api/conventions', require('./routes/conventions.routes'));
app.use('/api/signatures', require('./routes/signatures.routes'));
app.use('/pdfs', express.static('pdfs'));



// default route
app.get('/', (req, res) => {
  res.send('E-Sign PRO API is running ✅, we are at the fondation');
});

module.exports = app;

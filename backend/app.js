const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/pdfs', express.static('pdfs'));

// Routes

const conventionsRoutes = require('./routes/conventionsRoutes');
const signaturesRoutes = require('./routes/signaturesRoutes');

app.use('/api/conventions', conventionsRoutes);
app.use('/api/signatures', signaturesRoutes);



app.get('/', (req, res) => {
  res.send('E-Sign PRO API is running ✅');
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

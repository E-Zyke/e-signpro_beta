const app = require('./app');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`, `\n🚀 Frontend =`, process.env.FRONTEND_URL, ",Backend =", process.env.BACKEND_URL);
});

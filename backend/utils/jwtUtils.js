const jwt = require('jsonwebtoken');

function generateSignatureToken(id_convention, role) {
  return jwt.sign(
    { id_convention, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION || '24h' }
  );
}

module.exports = {
  generateSignatureToken
};

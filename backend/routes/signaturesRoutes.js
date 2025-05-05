const express = require('express');
const router = express.Router();
const signaturesController = require('../controllers/signaturesController');

// Signer une convention via lien sécurisé
router.post('/:token', signaturesController.signConvention);

module.exports = router;

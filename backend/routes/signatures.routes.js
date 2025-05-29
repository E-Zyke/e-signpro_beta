const express = require('express');
const router = express.Router();
const signaturesController = require('../controllers/signaturesController');


router.post('/:token', signaturesController.signConvention);

module.exports = router;

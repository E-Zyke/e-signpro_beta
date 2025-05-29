const express = require('express');
const router = express.Router();
const conventionsController = require('../controllers/conventionsController');

// Route pour créer une convention
router.post('/', conventionsController.createConvention);
// router.get('/', conventionsController.getAllConventions);
router.get('/:id', conventionsController.getConventionById);
// router.patch('/:id', conventionsController.updateConvention);
// router.delete('/:id', conventionsController.deleteConvention);

module.exports = router;

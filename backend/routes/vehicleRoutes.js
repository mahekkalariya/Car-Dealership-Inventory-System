const express = require('express');
const { getVehicles, createVehicle } = require('../controllers/vehicleController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, getVehicles);
router.post('/', protect, createVehicle);

module.exports = router;
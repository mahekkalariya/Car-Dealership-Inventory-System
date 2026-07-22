const express = require('express');
const { getVehicles, createVehicle, updateVehicle } = require('../controllers/vehicleController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, getVehicles);
router.post('/', protect, createVehicle);
router.put('/:id', protect, updateVehicle);

module.exports = router;
const express = require('express');
const {
  getVehicles,
  searchVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle
} = require('../controllers/vehicleController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// IMPORTANT: /search must stay above any /:id route below it.
router.get('/search', protect, searchVehicles);

router.get('/', protect, getVehicles);
router.post('/', protect, createVehicle);
router.put('/:id', protect, updateVehicle);
router.delete('/:id', protect, adminOnly, deleteVehicle);

module.exports = router;
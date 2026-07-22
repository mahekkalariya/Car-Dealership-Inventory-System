const express = require('express');
const {
  getVehicles,
  searchVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  purchaseVehicle
} = require('../controllers/vehicleController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/search', protect, searchVehicles);

router.get('/', protect, getVehicles);
router.post('/', protect, createVehicle);
router.put('/:id', protect, updateVehicle);
router.delete('/:id', protect, adminOnly, deleteVehicle);

router.post('/:id/purchase', protect, purchaseVehicle);

module.exports = router;
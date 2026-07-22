const Vehicle = require('../models/Vehicle');

async function getVehicles(req, res, next) {
  try {
    const vehicles = await Vehicle.find().sort({ createdAt: -1 });
    res.status(200).json(vehicles);
  } catch (err) {
    next(err);
  }
}

module.exports = { getVehicles };
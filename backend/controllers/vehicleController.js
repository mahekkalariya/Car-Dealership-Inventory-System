const Vehicle = require('../models/Vehicle');

function notFound(res) {
  return res.status(404).json({ message: 'Vehicle not found' });
}

async function getVehicles(req, res, next) {
  try {
    const vehicles = await Vehicle.find().sort({ createdAt: -1 });
    res.status(200).json(vehicles);
  } catch (err) {
    next(err);
  }
}

async function createVehicle(req, res, next) {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json(vehicle);
  } catch (err) {
    next(err);
  }
}

async function updateVehicle(req, res, next) {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!vehicle) return notFound(res);
    res.status(200).json(vehicle);
  } catch (err) {
    next(err);
  }
}

async function deleteVehicle(req, res, next) {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) return notFound(res);
    res.status(200).json({ message: 'Vehicle deleted' });
  } catch (err) {
    next(err);
  }
}

module.exports = { getVehicles, createVehicle, updateVehicle, deleteVehicle };
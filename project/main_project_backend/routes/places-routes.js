const express = require("express");

const HttpError = require("../models/http-error");

const placesControllers = require('../controllers/places-controller'); 

const router = express.Router();

router.get("/place/:pid", placesControllers.getPlaceById)

router.get("/user/:uid", placesControllers.getPlaceByUserId)

router.post('/', placesControllers.createPlace); 

router.patch('/:pid', placesControllers.updatePlaceById);

router.delete('/:pid', placesControllers.deletePlaceById); 

module.exports = router;

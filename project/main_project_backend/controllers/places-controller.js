const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const getCoordinates = require("../util/location");
const Place = require("../models/place");
const mongoose = require('mongoose'); 
const User = require("../models/user"); 

//data cant be a const if you plan to change the data within the object
// let DUMMY_PLACES = [
//   {
//     id: "p1",
//     title: "Empire State Building",
//     description: "One of the most famous sky scrapers in the world!",
//     location: {
//       lat: 40.7484474,
//       lng: -73.9871516,
//     },
//     address: "20 W 34th St, New York, NY 10001",
//     creator: "u1",
//   },
// ];

// checks for a place based off the the places ID and returns it
const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid; // { pid: 'p1' }

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "could not find a place that matches this ID",
      500
    );
    return next(error);
  }

  if (!place) {
    const error = HttpError(
      "could not find a place with the given place id",
      404
    );
    return next(error);
  }

  res.json({ place: place.toObject({ getters: true }) }); // => { place } => { place: place }
};

// function getPlaceById() { ... }
// const getPlaceById = function() { ... }

// checks for places with a specific user ID and returns it
const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (err) {
    const error = new HttpError(
      "Fetching places failed, please try again",
      500
    );
    return next(error);
  }

  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find a place for the provided user id.", 404)
    );
  }

  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });
};

const uuid = require("uuid/dist/v4");

// this is the function for creating a new place which is used in the POST method
const createPlace = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    console.log(error);
    return next(
      new HttpError("Invalid inputs, please check your input data", 422)
    );
  }

  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordinates(address);
  } catch (error) {
    return next(error);
  }

  const randomId = "" + Math.floor(Math.random() * 10000);
  // const title = req.body.title;
  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image: "https://i.ytimg.com/vi/nVzKzoFJkQo/maxresdefault.jpg",
    creator
  });

  let user; 

  try {
    user = await User.findById(creator); 

  } catch (err) {
    const error = new HttpError('creating place failed', 500); 
    return next(error); 
  }

  if (!user) {
    const error = new HttpError('Could not find user for provided Id', 404); 
    return next(error); 
  }

  console.log(user)

  try {
    const sesh = await mongoose.startSession() 
    sesh.startTransaction(); 
    await createdPlace.save({ session: sesh }); 
    user.places.push(createdPlace); 
    await user.save({ session: sesh });
    await sesh.commitTransaction();  

  } catch (err) {
    const error = new HttpError("Failed place creation, please try again", 500);
    return next(error);
  }
  res.status(201).json({ place: createdPlace });
};

// this updates a place's title and description based off of the place's ID
const updatePlaceById = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    console.log(error);
    return next(
      new HttpError("please enter a valid title and description", 422)
    );
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "cannot update place, something went wrong",
      500
    );
    return next(error);
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update the place.",
      500
    );
    return next(error);
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

// deletes a place if it matches the ID that is inputted
const deletePlaceById = async (req, res, next) => {
  const placeId = req.params.pid;
  let place;

  try {
    place = await (await Place.findById(placeId)).populate('creator');
  } catch (err) {
    const error = new HttpError("could not delete place", 500);
    return next(error);
  }

  if (!place) {
    const error = new HttpError('Could not find the corresponding place for the given ID', 404); 
    return next(error); 
  }

  try {
    const sesh = await mongoose.startSession(); 
    sesh.startTransaction();
    await place.remove({session: sesh}); 
    place.creator.places.pull(place); 
    await place.creator.save({session: sesh}); 
    await sesh.commitTransaction(); 
    
  } catch (err) {
    const error = new HttpError("could not delete place, e2", 500);
    return next(error);
  }

  res.status(200).json({ message: "Successfully deleted place!" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;

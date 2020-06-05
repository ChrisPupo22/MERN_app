const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator'); 


//data cant be a const if you plan to change the data within the object
let DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    location: {
      lat: 40.7484474,
      lng: -73.9871516
    },
    address: '20 W 34th St, New York, NY 10001',
    creator: 'u1'
  }
];

// checks for a place based off the the places ID and returns it 
const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid; // { pid: 'p1' }

  const place = DUMMY_PLACES.find(p => {
    // console.log(p.id)
    return p.id === placeId;
  });

  if (!place) {
    return next(
      new HttpError('could not find a place with the given place id', 404)
    );
  }

  res.json({ place }); // => { place } => { place: place }
};

// function getPlaceById() { ... }
// const getPlaceById = function() { ... }


// checks for places with a specific user ID and returns it
const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
 

  const places = DUMMY_PLACES.filter(p => {
    return p.creator === userId; 
  });

  if (!places || places.length === 0) {
    return next(
      new HttpError('Could not find a place for the provided user id.', 404)
    );
  }

  res.json({ places });
};

const uuid = require('uuid/dist/v4')

// this is the function for creating a new place which is used in the POST method
const createPlace = (req, res, next) => {
  const error = validationResult(req); 
  if(!error.isEmpty()) {
    console.log(error)
    throw new HttpError('Invalid inputs, please check your input data', 422); 
  }

  const { title, description, coordinates, address, creator } = req.body;
  const randomId = '' + Math.floor(Math.random() * 10000);
  // const title = req.body.title;
  const createdPlace = {
    id: randomId, 
    title,
    description,
    location: coordinates,
    address,
    creator
  };

  DUMMY_PLACES.push(createdPlace); //unshift(createdPlace)

  res.status(201).json({place: createdPlace});
};


// this updates a place's title and description based off of the place's ID
const updatePlaceById = (req, res, next) => {
  const error = validationResult(req); 
  if (!error.isEmpty()) {
    console.log(error); 
    throw new HttpError('please enter a valid title and description', 422); 
  }

  const { title, description } = req.body;
  const placeId = req.params.pid; 

  const placeToUpdate = {...DUMMY_PLACES.find(p => {
    return p.id === placeId; 
  })}; 
  const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId); 
  placeToUpdate.title = title; 
  placeToUpdate.description = description; 

  DUMMY_PLACES[placeIndex] = placeToUpdate; 

  res.status(200).json({place: placeToUpdate})
  
}

// deletes a place if it matches the ID that is inputted 
const deletePlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  if (!DUMMY_PLACES.find(p => p.id === placeId)) {
    throw new HttpError('Could not find a location with the given ID', 404); 
  }
  DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId); 
  res.status(200).json({message: 'Successfully deleted place!'})

}

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById; 
exports.deletePlaceById = deletePlaceById; 



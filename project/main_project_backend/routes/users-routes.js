const express = require('express'); 

const places = require('./places-routes')

const usersController = require('../controllers/users-controller'); 

const router = express.Router(); 

router.get('/', usersController.getAllUsers); 

router.post('/signup', usersController.createUser); 

router.post('/login', usersController.userLogin);

module.exports = router; 
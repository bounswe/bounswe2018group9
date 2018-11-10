var express = require('express');
var router = express.Router();

//Import Controllers
var UserController = require('../controllers/UserController');

//Import Models
var User = require('../models/User');

// Get all users
router.get('/', UserController.getAllUsers);

// Get a specific user by an id.
router.get('/:id', UserController.getUserById);//this should be last in code

module.exports=router;

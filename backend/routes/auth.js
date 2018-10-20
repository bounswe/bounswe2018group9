var express = require('express');
var router = express.Router();

// Import Controllers
var UserController = require('../controllers/UserController');

// Import model
var User = require('../models/User');

// Router from UserController
router.post('/signup', UserController.addUser);
router.post('/signin', UserController.signUser);

router.get('/dashboard',UserController.loggedIn); //First user signed in then dashboard can be seen
router.get('/signout',UserController.logOut);

module.exports = router;

var express = require('express');
var router = express.Router();

// Import Controllers
var UserController = require('../controllers/UserController');
var AuthController = require('../controllers/AuthController');

// Import model
var User = require('../models/User');

// Router from UserController
router.post('/signup', UserController.addUser);
router.post('/signin', AuthController.signIn);

module.exports = router;

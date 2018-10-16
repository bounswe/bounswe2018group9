var express = require('express');
var router = express.Router();

// Import Controllers
var UserController = require('../controllers/UserController');

// Import model
var User = require('../models/User');

router.post('/signup', UserController.addUser);

module.exports = router;
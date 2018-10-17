var express = require('express');
var router = express.Router();

//Import Controllers
var EventController = require('../controllers/EventController');

//Import Models
var Event= require('../models/Event');

router.post('/addEvent', EventController.addEvent);

module.exports=router;

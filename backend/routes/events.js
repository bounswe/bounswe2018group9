var express = require('express');
var router = express.Router();

//Import Controllers
var EventController = require('../controllers/EventController');

//Import Models
var Event= require('../models/Event');


router.post('/', EventController.addEvent);

router.get('/',EventController.getAllEvents);
router.get('/getEventbyOwner',EventController.getEventbyOwner)
router.get('/:id', EventController.getEventbyId);//this should be last in code
module.exports=router;

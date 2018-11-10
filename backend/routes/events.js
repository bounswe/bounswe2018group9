var express = require('express');
var router = express.Router();

//Import Controllers
var EventController = require('../controllers/EventController');

//Import Models
var Event= require('../models/Event');

router.post('/', EventController.addEvent);


router.get('/',EventController.getAllEvents);
router.get('/getEventbyOwner/:id',EventController.getEventbyOwner);
// these should be last in code
router.get('/:id', EventController.getEventbyId);
router.put('/:id', EventController.updateEventbyId);


// Updates the attendee status of an event
router.post('/:id/attendee', EventController.updateAttendee);
module.exports=router;

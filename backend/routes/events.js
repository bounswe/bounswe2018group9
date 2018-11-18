var express = require('express');
var router = express.Router();

//Import Controllers
const EventController = require('../controllers/EventController');

router.get('/', EventController.getAllEvents);
router.get('/getEventbyCreator/:id', EventController.getEventbyCreator);

router.post('/', EventController.addEvent);


// Updates the attendee status of an event
router.post('/:id/attendee', EventController.updateAttendee);

// these should be last in code
router.put('/:id', EventController.updateEvent);
router.get('/:id', EventController.getEventbyId);

router.post('/:id/comments', EventController.addComment);
router.delete('/:id/comments/:commentId', EventController.deleteComment);
router.put('/:id/comments/:commentId', EventController.updateComment);

module.exports = router;

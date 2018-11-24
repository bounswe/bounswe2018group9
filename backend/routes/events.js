var express = require('express');
var router = express.Router();

//Import Controllers
const EventController = require('../controllers/EventController');

router.get('/', EventController.getAllEvents);
router.get('/getEventbyCreator/:id', EventController.getEventbyCreator);

router.post('/', EventController.addEvent);

//Media endpoints
router.post('/:id/media', EventController.addMedia);
//router.get('/:id/media', EventController.getallMedia);
router.put('/:id/media', EventController.updateMedia);
router.delete('/:id/media', EventController.deleteMedia);


// Adds an attendance to an event
router.post('/:id/attendance', EventController.addAttendance);
router.get('/:id/attendance', EventController.getAttendance);
router.put('/:id/attendance', EventController.updateAttendance);

//Adds a vote to event
router.post('/:id/vote', EventController.addVote);
router.get('/:id/vote', EventController.getVote);
router.put('/:id/vote', EventController.updateVote);

// these should be last in code
router.put('/:id', EventController.updateEvent);
router.get('/:id', EventController.getEventbyId);
router.delete('/:id', EventController.deleteEvent);

router.post('/:id/comments', EventController.addComment);
router.get('/:id/comments', EventController.getComments);
router.delete('/:id/comments/:commentId', EventController.deleteComment);
router.put('/:id/comments/:commentId', EventController.updateComment);

module.exports = router;

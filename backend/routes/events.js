var express = require('express');
var router = express.Router();

//Import Controllers
const EventController = require('../controllers/EventController');

router.get('/', EventController.getAllEvents);
router.get('/getEventbyCreator/:id', EventController.getEventbyCreator);

router.post('/', EventController.addEvent);


// Adds an attendance to an event
router.post('/:id/attendance', EventController.addAttendance);
router.get('/:id/attendance', EventController.getAttendance);
router.put('/:id/attendance', EventController.updateAttendance);

// these should be last in code
router.put('/:id', EventController.updateEvent);
router.get('/:id', EventController.getEventbyId);

router.post('/:id/comments', EventController.addComment);
router.delete('/:id/comments/:commentId', EventController.deleteComment);
router.put('/:id/comments/:commentId', EventController.updateComment);

module.exports = router;

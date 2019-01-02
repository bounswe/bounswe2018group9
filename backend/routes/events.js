var express = require('express');
var router = express.Router();
const passport = require('passport');

//Import Controllers
const EventController = require('../controllers/EventController');

router.get('/', EventController.getAllEvents);

router.post('/', passport.authenticate('jwt', {session: false}), EventController.addEvent);

// Media endpoints
router.post('/:id/media', EventController.addMedia);
router.get('/:id/media', EventController.getMedia);
router.put('/:id/media/:mediaId', passport.authenticate('jwt', {session: false}), EventController.updateMedia);
router.delete('/:id/media/:mediaId', passport.authenticate('jwt', {session: false}), EventController.deleteMedia);


// Adds an attendance to an event
router.post('/:id/attendance', passport.authenticate('jwt', {session: false}), EventController.addAttendance);
router.get('/:id/attendance', EventController.getAttendance);
router.put('/:id/attendance', passport.authenticate('jwt', {session: false}), EventController.updateAttendance);

//Adds a vote to event
router.post('/:id/vote', passport.authenticate('jwt', {session: false}), EventController.vote);
router.post('/:id/unvote', passport.authenticate('jwt', {session: false}), EventController.unvote);
router.get('/:id/getVotes', EventController.getVotes);


// these should be last in code
router.put('/:id', passport.authenticate('jwt', {session: false}), EventController.updateEvent);
router.get('/:id', EventController.getEventbyId);
router.delete('/:id', passport.authenticate('jwt', {session: false}), EventController.deleteEvent);

router.post('/:id/comments', passport.authenticate('jwt', {session: false}), EventController.addComment);
router.get('/:id/comments', EventController.getComments);
router.delete('/:id/comments/:commentId', passport.authenticate('jwt', {session: false}), EventController.deleteComment);
router.put('/:id/comments/:commentId', passport.authenticate('jwt', {session: false}), EventController.updateComment);

module.exports = router;

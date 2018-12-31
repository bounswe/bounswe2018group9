var express = require('express');
var router = express.Router();
const passport = require('passport');

//Import Controllers
var UserController = require('../controllers/UserController');
var TimelineController = require('../controllers/TimelineController');
const AttendanceController = require('../controllers/utils/AttendanceController');

//Import Models
var User = require('../models/User');

// Get all users
router.get('/', UserController.getAllUsers);

// Get a specific user by an id.
router.get('/:id', UserController.getUserById);//this should be last in code


// MEDIA ENDPOINTS
router.get('/:id/avatar', UserController.getAvatar);
router.get('/:id/cover', UserController.getCover);

router.post('/:id/avatar', passport.authenticate('jwt', {session: false}), UserController.addAvatar);
router.post('/:id/cover', passport.authenticate('jwt', {session: false}), UserController.addCover);

router.put('/:id/avatar', passport.authenticate('jwt', {session: false}), UserController.updateAvatar);
router.put('/:id/cover', passport.authenticate('jwt', {session: false}), UserController.updateCover);

router.delete('/:id/avatar', passport.authenticate('jwt', {session: false}), UserController.deleteAvatar);
router.delete('/:id/cover', passport.authenticate('jwt', {session: false}), UserController.deleteCover);

// TIMELINE ENDPOINTS
router.get('/:id/ownEvents', TimelineController.getOwnEvents);
router.get('/:id/willAttendEvents', TimelineController.getWillAttendEvents);
router.get('/:id/willNotAttendEvents', TimelineController.getWillNotAttendEvents);
router.get('/:id/mayAttendEvents', TimelineController.getMayAttendEvents);

/* POST ENDPOINTS */
// Following and follower endpoints
// User with the id follows someone.
router.post('/:id/follow', passport.authenticate('jwt', {session: false}), UserController.follow);
router.post('/:id/unfollow', passport.authenticate('jwt', {session: false}), UserController.unfollow);

// Attendance Endpoints
router.post('/:id/willAttend', AttendanceController.willAttend);
router.post('/:id/willNotAttend', AttendanceController.willNotAttend);
router.post('/:id/mayAttend', AttendanceController.mayAttend);

// User with the id is followed by someone. These endpoints will be deleted after test. 
// And will be called inside follow and unfollow.
router.post('/:id/addFollower', passport.authenticate('jwt', {session: false}), UserController.addFollower);
router.post('/:id/removeFollower', passport.authenticate('jwt', {session: false}), UserController.removeFollower);

/* PUT ENDPOINTS */
router.put('/:id', passport.authenticate('jwt', {session: false}), UserController.updateUser);

/* DELETE ENDPOINTS */
router.delete('/:id', passport.authenticate('jwt', {session: false}), UserController.deleteUser);





module.exports=router;

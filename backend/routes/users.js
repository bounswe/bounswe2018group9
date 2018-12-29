var express = require('express');
var router = express.Router();

//Import Controllers
var UserController = require('../controllers/UserController');
var SearchController = require('../controllers/SearchController');
//Import Models
var User = require('../models/User');

// Get all users
router.get('/', UserController.getAllUsers);

// Get a specific user by an id.
router.get('/:id', UserController.getUserById);//this should be last in code


/* POST ENDPOINTS */
// Following and follower endpoints
// User with the id follows someone.
router.post('/:id/follow', UserController.follow);
router.post('/:id/unfollow', UserController.unfollow);
router.get('/:id/feed', SearchController.getFeed);

// User with the id is followed by someone. These endpoints will be deleted after test. 
// And will be called inside follow and unfollow.
router.post('/:id/addFollower', UserController.addFollower);
router.post('/:id/removeFollower', UserController.removeFollower);

/* PUT ENDPOINTS */
router.put('/:id', UserController.updateUser);

/* DELETE ENDPOINTS */
router.delete('/:id', UserController.deleteUser);

module.exports=router;

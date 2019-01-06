const express = require('express');
const passport = require('passport');

var router = express.Router();

//Import Controllers
const FeedController = require('../controllers/FeedController');

router.get('/', passport.authenticate('jwt', {session: false}), FeedController.getFeed);

module.exports = router;
var express = require('express');
var router = express.Router();

//Import Controllers
const FeedController = require('../controllers/FeedController');

router.get('/:id', FeedController.getFeedForUserWithId);

module.exports = router;
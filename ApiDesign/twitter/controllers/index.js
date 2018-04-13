const express = require('express');
const router = express.Router();

const Basics = require('./basics');
const Trends = require('./trends');
const Tweets = require('./tweets');

// Basics module router
router.get('/tweets/:contains', Basics.getTweetsContaining);

// Trends module router
router.get('/trends/:countryName', Trends.getTrendsForCountry);

// Tweets module router
router.post('/tweets', Tweets.postTweet);
router.get('/home', Tweets.getHome);

module.exports = router;

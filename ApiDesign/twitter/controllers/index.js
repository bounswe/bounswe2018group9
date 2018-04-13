const express = require('express');
const router = express.Router();

const Trends = require('./trends');
const Tweets = require('./tweets');

// Tweets module router
router.get('/tweets/:contains', Tweets.getTweetsContaining);
router.post('/tweets', Tweets.postTweet);
router.get('/home', Tweets.getHome);

// Trends module router
router.get('/trends/:countryName', Trends.getTrendsForCountry);

module.exports = router;

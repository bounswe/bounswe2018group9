const express = require('express');
const router = express.Router();

const Basics = require('./basics');
const Trends = require('./trends');
const Tweets = require('./tweets');

// Basics module router
router.get('/getTweets/:contains', Basics.getTweetsContaining);

// Trends module router
router.get('/getTrends/:countryName', Trends.getTrendsForCountry);

// Tweets module router
router.post('/postTweet', Tweets.postTweet);
router.get('/getHome', Tweets.getHome);

module.exports = router;

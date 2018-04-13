const express = require('express');
const router = express.Router();

const Trends = require('./trends');
const Tweets = require('./tweets');
const Retweet = require('./retweet');

// Tweets module router
router.get('/tweets', Tweets.getTweetsContaining);
router.post('/tweets', Tweets.postTweet);
router.get('/home', Tweets.getHome);

// Trends module router
router.get('/trends/:countryName', Trends.getTrendsForCountry);


// Retweet
router.post('/retweet/:id', Retweet.retweet);

module.exports = router;

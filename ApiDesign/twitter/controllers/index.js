const express = require('express');
const router = express.Router();

const Trends = require('./trends');
const Tweets = require('./tweets');

// Tweets module router
router.get('/tweets', Tweets.getTweetsContaining);
router.post('/tweets', Tweets.postTweet);
router.get('/home', Tweets.getHome);
router.post('/retweet/:id',Tweets.retweet);
// Trends module router
router.get('/trends/:countryName', Trends.getTrendsForCountry);


module.exports = router;

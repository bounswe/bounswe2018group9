const express = require('express');
const router = express.Router();

const Trends = require('./trends');
const Tweets = require('./tweets');
const Followers = require('./followers');

// Tweets module router
router.get('/tweets', Tweets.getTweetsContaining);
router.post('/tweets', Tweets.postTweet);
router.get('/home', Tweets.getHome);

// Trends module router
router.get('/trends/:countryName', Trends.getTrendsForCountry);

router.get('/followers', Followers.getFollowers);

module.exports = router;

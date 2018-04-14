const express = require('express');
const router = express.Router();

const Trends = require('./trends');
const Tweets = require('./tweets');
const Geo = require('./geo');
// Tweets module router
router.get('/tweets', Tweets.getTweetsContaining);
router.post('/tweets', Tweets.postTweet);
router.get('/home', Tweets.getHome);
router.post('/retweet/:id',Tweets.retweet);
// Trends module router
router.get('/trends/:countryName', Trends.getTrendsForCountry);
// Geo module router
router.get('geo/search',Geo.getInfoAboutPlace)

module.exports = router;

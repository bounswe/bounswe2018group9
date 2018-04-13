const express = require('express');
const router = express.Router();

const Trends = require('./trends');
const Tweets = require('./tweets');
const Account= require('./account');

// Tweets module router
router.get('/tweets', Tweets.getTweetsContaining);
router.post('/tweets', Tweets.postTweet);
router.get('/home', Tweets.getHome);

// Trends module router
router.get('/trends/:countryName', Trends.getTrendsForCountry);

//Accounts module router
router.get('/account/description', Account.getDescription);
router.post('/account/description', Account.setDescription);
router.post('/account/url', Account.setURL);


module.exports = router;

const express = require('express');
const router = express.Router();

const multer = require('multer');

const Trends = require('./trends');
const Tweets = require('./tweets');
const Followers = require('./followers');
const Account = require('./account');
const Media = require('./media');

const uploading = multer({
    dest: __dirname + '/../../uploads/',
});

const Geo = require('./geo');

// Tweets module router
router.get('/tweets', Tweets.getTweetsContaining);
router.post('/tweets', Tweets.postTweet);
router.get('/home', Tweets.getHome);
router.get('/retweet/:id',Tweets.retweet);
router.post('/tweetWithMedia', Media.uploadMediaToTwitter);

// Trends module router
router.get('/trends/:countryName', Trends.getTrendsForCountry);

// Geo module router
router.get('/geo/search',Geo.getInfoAboutPlace)

//Accounts module router
router.get('/account/description', Account.getDescription);
router.post('/account/description', Account.setDescription);
router.post('/account/url', Account.setURL);

// Followers
router.get('/followers', Followers.getFollowers);

// Upload image
router.post('/media/upload', uploading.single('image'), Media.uploadMediaToServer);

module.exports = router;

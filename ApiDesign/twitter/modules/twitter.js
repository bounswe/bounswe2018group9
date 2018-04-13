const Twit = require('twit');
const config = require('./config');
const twitter = new Twit(config);

module.exports = twitter;
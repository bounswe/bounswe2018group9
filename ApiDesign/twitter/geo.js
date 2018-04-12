const Twit = require('twit');
const config = require('./config');
const twitter = new Twit(config);

console.log("hello geo");
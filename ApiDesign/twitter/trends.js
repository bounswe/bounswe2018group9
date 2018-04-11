const Twit = require('twit');

// Get authentication keys
const config = require('./config');

// Twit is a NPM package for Twitter API
// Documentation of the package is here: https://www.npmjs.com/package/twit
const twitter = new Twit(config);

// The object with some parameters needed by the API
const params = {id: 1};

function printTweets(error, data, response) {
    console.log(data);
    /*
    if(data != null){
        const tweets = data.statuses;
        for (let i=0; i<tweets.length; i++){
            console.log(tweets[i].text);
        }
    } else {
        console.log('No tweet is retrieved');
    }*/
}

// Call Twitter API
// You can run this code with node basics.js
twitter.get('trends/place', params, printTweets);

function getTrendsForCity(id, callback) {
    twitter.get('search/tweets', {q: contains, count: count }, callback);
}

// Export everything you desire to be available from outside
module.exports = {
    getTrendsForCity: getTrendsForCity
}





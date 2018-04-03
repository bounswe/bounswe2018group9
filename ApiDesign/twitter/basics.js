const Twit = require('twit');

// Get authentication keys
const config = require('./config');

// Twit is a NPM package for Twitter API
// Documentation of the package is here: https://www.npmjs.com/package/twit
const twitter = new Twit(config);

/* AN EXAMPLE CALL*/

/* This is the function we give as a parameter below
*   The logic is actually simple, when we call the twitter API, it takes some time
*   we have a response from it. Therefore, we write a function that will run asynchronously
*   when the response is ready.
*
*   This function is for example prints the texts of tweets
*
*   You can first print the content of data and response to resolve the fields of the objects
*   using console.log()
*
* */
function printTweets(error, data, response) {
    if(data != null){
        const tweets = data.statuses;
        for (let i=0; i<tweets.length; i++){
            console.log(tweets[i].text);
        }
    } else {
        console.log('No tweet is retrieved');
    }
}

// The object with some parameters needed by the API
const params = {q: 'zeytindalı', count: 2};

// Call Twitter API
// You can run this code with node basics.js
twitter.get('search/tweets', params, printTweets);

/* Export functions to be used elsewhere
*
* We can implement some utility functions and export them so that they are
* used in other files
* */

/*
    Wrapper function for twitter API getting tweets containing some string
    contains: the string tweets must include
    count: number of tweets to be retrieved
    callback : the function in which we specify what will be done with the response of the twitter
*/
function getTweetsContaining(contains, count, callback) {
    twitter.get('search/tweets', {q: contains, count: count }, callback);
}

// Export everything you desire to be available from outside
module.exports = {
    twitter: twitter,
    getTweetsContaining: getTweetsContaining
}





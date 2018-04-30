const twitter = require('./twitter');

/*
    Wrapper function for twitter API getting tweets containing some string
    contains: the string tweets must include
    count: number of tweets to be retrieved
    callback : the function in which we specify what will be done with the response of the twitter
*/
function getTweetsContaining(contains, count, callback) {
    twitter.get('search/tweets', {q: contains, count: count }, callback);
}

function postTweet(tweetText , callback) {
    var tweet = {
        status: tweetText
    };
    twitter.post('statuses/update',tweet, callback);
}

function getHome(twitCount, callback){
    const params = {
        count:twitCount
    };
    twitter.get("statuses/home_timeline", params, callback);
}

// id ; extracted tweet id from request parameters.
function retweet(id, callback){
    // output of callback is transferred to caller of this function.
    twitter.post('statuses/retweet/:id', { id: id }, callback);
    }

module.exports = {
    getTweetsContaining: getTweetsContaining,
    getHome: getHome,
    postTweet: postTweet,
    retweet :retweet
}

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

function postTweet(tweetText) {
    var tweet = {
        status: tweetText
    };
    twitter.post('statuses/update',tweet,function(err,req,res){
        if(!err){
        console.log("Tweet has been posted!");
      }
      else{
        console.log("Something went wrong.");
      }
    });
}

function getHome(twitCount,callback){
    params = {
    count:twitCount
    }
    twitter.get("statuses/home_timeline",params,callback);
}

function retweet(id){
    twitter.post('statuses/retweet/:id', { id: id }, function result(error, data, response) {
        if(!error){
            
            console.log("success");
            
        } else {
            console.log('error');
        }
    });
    }

module.exports = {
    getTweetsContaining: getTweetsContaining,
    getHome: getHome,
    postTweet: postTweet,
    retweet :retweet
}

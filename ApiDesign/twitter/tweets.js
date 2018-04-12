const Twit = require('twit');
const config = require('./config');
const twitter = new Twit(config);

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


module.exports = {
    twitter: twitter,
    getHome: getHome,
    postTweet: postTweet
}

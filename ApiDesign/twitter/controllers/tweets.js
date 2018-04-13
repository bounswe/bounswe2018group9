const twitter = require('../').modules;

function postTweet(request, response) {
    console.log(request.body);
    var tweet = request.body['tweetText'];
    twitter.tweets.postTweet(tweet);
}

function getHome(request, response) {
    var numOfTweets = request.url.split('=')[1];
    twitter.tweets.getHome(numOfTweets,(error,data,twitRes) =>{
        if (data != null) {
            const responseArray = [];
            for (let i=0; i<data.length; i++){
                var tweet = {};
                tweet['text'] = data[i].text;
                tweet['user'] = data[i].user.name;
                tweet['time'] = data[i].created_at;
                responseArray.push(tweet);
            }
            response.json(JSON.stringify(responseArray));
        }
        else {
            response.json('No tweet is retrieved');
        }
    });
}

module.exports = {
    postTweet: postTweet,
    getHome: getHome
};
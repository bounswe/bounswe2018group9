const twitter = require('../modules');

function getTweetsContaining(request, response) {
    console.log(request);
    const keyword = request.query.keyword;
    const count = request.query.count;
    twitter.tweets.getTweetsContaining(keyword, count, (error, data, twitterRes) => {
        if (data != null) {
            const tweets = data.statuses;
            const responseArray = [];
            for (let i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
                responseArray.push(tweets[i].text);
            }
            response.send(responseArray);
        }else {
            response.end('No tweet is retrieved');
        }
    });
}

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

function retweet(request, response) {
    var id = request.params.id;
    twitter.retweet.retweet(id);
}

module.exports = {
    getTweetsContaining: getTweetsContaining,
    postTweet: postTweet,
    getHome: getHome,
    retweet : retweet
};
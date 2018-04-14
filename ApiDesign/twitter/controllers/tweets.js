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
    response.end('Success');
}

function getHome(request, response) {
    var numOfTweets = request.params.count;
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
            response.json(responseArray);
        }
        else {
            response.json('No tweet is retrieved');
        }
    });
}
// Router calls this function if the URL is /retweet/:id
function retweet(request, response) {
    // /retweet/:id causes id to be a parameter. Extract id from parameters of the request.
    var id = request.params.id;
    
    twitter.retweet.retweet(id,(error,data,response) => {
        // If there is an error show it with its status code.
        if(error){
            response.status(error.statusCode).send(error.message);
        }else{
            // If there is not, show the text with the response's status code.
            response.status(response.statusCode).send("Retweeted requested tweet");
        }
    });
}



module.exports = {
    getTweetsContaining: getTweetsContaining,
    postTweet: postTweet,
    getHome: getHome,
    retweet : retweet
};
const twitter = require('../modules');

function getTweetsContaining(request, response) {
    const keyword = request.query.keyword;
    const count = request.query.count;
    twitter.tweets.getTweetsContaining(keyword, count, (error, data, twitterRes) => {
        if (error) {
            response.json({
                status: "ERROR",
                data: error
            });
        } else if(!keyword || !count){
            response.json({
                status: "ERROR",
                data: "Please provide query parameters keyword and count!"
            });
        } else if (data != null) {
            const tweets = data.statuses;
            const responseArray = [];
            for (let i = 0; i < tweets.length; i++) {
                console.log(tweets[i]);
                const tweet = {
                    text: tweets[i].text,
                    id: tweets[i].id,
                    user: {
                        id: tweets[i].user.id,
                        name: tweets[i].user.name,
                        screenName: tweets[i].user.screen_name,
                        location: tweets[i].user.location
                    }
                };
                responseArray.push(tweet);
            }
            response.json({
                status: "SUCCESS",
                data: responseArray
            });
        }else {
            response.json({
                status: "EMPTY",
                data: []
            });
        }
    });
}

function postTweet(request, response) {
    console.log(request.body);
    var tweet = request.body['tweetText'];
    twitter.tweets.postTweet(tweet, (error, data, twitRes) => {
        if(error){
            response.json({
                status: "ERROR",
                data: error
            });
        } else {
            response.json({
                status: "SUCCESS",
                data: {
                    id: data.id
                }
            });
        }
    });

}

function getHome(request, response) {
    var numOfTweets = request.query.count;
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
const express = require('express');
const bodyParser = require('body-parser');
const twitterAPI = require('./twitter');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/getTweets', (request, response) => {
    console.log(request);
    twitterAPI.basics.getTweetsContaining('yeşilay', 3, (error, data, twitterRes) => {
        if (data != null) {
            const tweets = data.statuses;
            const responseArray = [];
            for (let i=0; i<tweets.length; i++){
                console.log(tweets[i].text);
                responseArray.push(tweets[i].text);
            }
            response.end(JSON.stringify(responseArray));
        }else {
            response.end('No tweet is retrieved');
        }
    });
});


app.post('/postTweet', (request, response) => {
    console.log(request.body);
    var tweet = request.body['tweetText'];
    twitterAPI.tweets.postTweet(tweet);
});

app.get('/getHome', (request, response) => {
    var numOfTweets = request.url.split('=')[1];
    twitterAPI.tweets.getHome(numOfTweets,(error,data,twitRes) =>{
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
});

app.listen(port, () =>{
    console.log('Server is running on ' + port);
});

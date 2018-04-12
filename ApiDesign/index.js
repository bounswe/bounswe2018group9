const express = require('express');
const bodyParser = require('body-parser');
const twitterAPI = require('./twitter');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('static'));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/getTweets/:contains', (request, response) => {
    console.log(request);
    const keyword = request.query.keyword;
    const count = request.query.count;
    twitterAPI.basics.getTweetsContaining(keyword, count, (error, data, twitterRes) => {
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

app.get('/getTrends/:countryName', (request, response) => {
    console.log(request);
    let countryName = request.params.countryName; 
    twitterAPI.trends.getTrendsForCountry(countryName, (error, data, twitterRes) => {
        if (data != null) {
            const trends = data[0].trends;
            const res = [];
            for(let trend of trends){
                tempTrend = {
                    "name":trend.name,
                    "url":trend.url
                };
                res.push(tempTrend);
            }
            response.end(JSON.stringify(res));
        } else {
            response.end('No trend is retrieved');

        }
    });
});


app.listen(port, () => {
    console.log('Server is running on ' + port);
});

const express = require('express');
const twitterAPI = require('./twitter');

const app = express();
const port = 3000;

app.get('/getTweets/:contains', (request, response) => {
    console.log(request);
    let contains = request.params.contains; 
    twitterAPI.basics.getTweetsContaining(contains, 3, (error, data, twitterRes) => {
        if (data != null) {
            const tweets = data.statuses;
            const responseArray = [];
            for (let i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
                responseArray.push(tweets[i].text);
            }
            response.end(JSON.stringify(responseArray));
        } else {
            response.end('No tweet is retrieved');
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
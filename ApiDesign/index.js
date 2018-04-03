const express = require('express');
const twitterAPI = require('./twitter');

const app = express();
const port = 3000;

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

app.listen(port, () =>{
    console.log('Server is running on ' + port);
});
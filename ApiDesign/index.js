const express = require('express');
const twitterAPI = require('./twitter');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('static'));

app.get('/getTweets', (request, response) => {
    console.log(request);
    const keyword = request.query.keyword;
    const count = request.query.count;
    twitterAPI.basics.getTweetsContaining(keyword, count, (error, data, twitterRes) => {
        if (data != null) {
            const tweets = data.statuses;
            const responseArray = [];
            for (let i=0; i<tweets.length; i++){
                console.log(tweets[i].text);
                responseArray.push(tweets[i].text);
            }
            response.send(responseArray);
        }else {
            response.end('No tweet is retrieved');
        }
    });
});

app.listen(port, () =>{
    console.log('Server is running on ' + port);
});
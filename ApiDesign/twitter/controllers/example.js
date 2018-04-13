const twitter = require('../').modules;

function getTweetsContaining(request, response) {
    console.log(request);
    const keyword = request.query.keyword;
    const count = request.query.count;
    twitter.example.getTweetsContaining(keyword, count, (error, data, twitterRes) => {
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

module.exports = {
    getTweetsContaining: getTweetsContaining
};
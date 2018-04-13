const twitter = require('../modules');

function getFollowers(request, response) {
    var screenName = request.query.screenName;
    twitter.followers.getFollowers(screenName, (error, data, twitterResponse) => {
        if(error) {
            console.log(error);
        }
        //console.log(twitterResponse);
        console.log(data);

        response.json(data);
    });

}

module.exports = {
    getFollowers : getFollowers
};
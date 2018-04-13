const twitter = require('../modules');

function getFollowers(request, response) {
    var screenName = request.params.screenName;
    var result = twitter.followers.getFollowers(screenName);
    response.json(result);
}

module.exports = {
    getFollowers : getFollowers
};
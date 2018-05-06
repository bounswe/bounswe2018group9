const twitter = require('./twitter');

function getFollowers(screenName, callback){
    twitter.get('followers/list', { screen_name: screenName }, callback);
}

module.exports = {
    getFollowers : getFollowers
};
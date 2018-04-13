
const twitter = require('../modules');

function retweet(request, response) {
    var id = request.params.id;
    twitter.retweet.retweet(id);
}


module.exports = {

retweet : retweet

}
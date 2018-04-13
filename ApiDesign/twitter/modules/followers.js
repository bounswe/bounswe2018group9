const twitter = require('./twitter');

function getFollowers(screen_name){
    twitter.get('followers/ids', { screen_name: screen_name },  function (err, data, response) {
        console.log(data)
      })
}

module.exports = {
    getFollowers : getFollowers
};
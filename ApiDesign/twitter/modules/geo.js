const twitter = require('./twitter');

function getInfoAboutPlace(lat, long, callback){
    const params = {
        lat: lat,
        long: long
    };

    twitter.get('geo/search', params ,callback);
}

module.exports = {
    getInfoAboutPlace : getInfoAboutPlace
};
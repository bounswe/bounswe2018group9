const Twit = require('twit');
const config = require('./config');
const twitter = new Twit(config);
const fs = require('fs');

function uploadImageToServer(){

}

function retweetImageToTwitter(imageName, callback) {
    const imagePath = __dirname + '/../../uploads/' + imageName;
    const image = fs.readFileSync(imagePath, {encoding: 'base64'});

    twitter.post('media/upload', {media: image}, callback);
}

module.exports = {
    tweetImageToTwitter: retweetImageToTwitter
}
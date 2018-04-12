const Twit = require('twit');
const config = require('./config');
const twitter = new Twit(config);

//console.log("hello media");
var exec =require ('child_process').exec;
var fs = require('fs');
/*
var Twitter = require('twitter'),
 requestP = require('request-promise-native');

 var twitterConfig = config.twitter;
    twitterConfig.access_token_key = tweet.accessToken;
    twitterConfig.access_token_secret = tweet.accessTokenSecret;
    var twitter;

    // first get the image data
    var promise = requestP(tweet.imageURL)
      .then(imageData => {
        //then the image first
        twitter = new Twitter(twitterConfig);
        return twitter.post("media/upload", {
          media: imageData
        }, function (error, tweets, response) {
          if (!error) {
            console.log(tweets);
          }
        });
      });*/
processing();
      
function processing(){
    var filename = 'media_pic/actopus.png';
    var params = {
        encoding: 'base64'
    }
    var b64content = fs.readFileSync(filename,params);


twitter.post('media/upload', { media_data: b64content }, uploaded); 

    function uploaded(err, data, response) {
     var id = data.media_id_string;
     var tweet ={
        status: '#actopus Actopus -- Culture, adrenalin and friendship project for web and android',
        media_ids: [id]
     }
    twitter.post('status/update',tweet,tweeted); 
}
}

function tweeted(err,data,response) {
    if (err) {
        console.log("something wrong!!!!")
    } else{
        console.log("it worked!!!!!")
    }
 }
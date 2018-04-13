const twitter = require('./twitter');


function retweet(id){
twitter.post('statuses/retweet/:id', { id: id }, function result(error, data, response) {
    if(!error){
        
        console.log("success");
        
    } else {
        console.log('error');
    }
});
}


module.exports = {

    retweet : retweet
}
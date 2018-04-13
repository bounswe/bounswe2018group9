const twitter = require('./twitter');

function retweet(iden){
    twitter.retweet('statuses/retweet/:id',{id: iden},function(err,req,res){
        if(!err){

            console.log("Retweet done!");
        }
        else{

            console.log("Something gone terribly wrong there");
        }

    });
}


module.exports = {
    retweet : retweet
}




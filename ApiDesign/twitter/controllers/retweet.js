const twitter = require('../modules');


function retweet(request,response){
	console.log(request);
	const id = request.params.id;
    twitter.retweet(id);
}

module.exports = {
    retweet: retweet
}

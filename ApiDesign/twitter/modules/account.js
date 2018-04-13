const twitter = require('./twitter');

function getDescription(callback)
{
	twitter.get('account/verify_credentials',callback);
	
}

function setDescription(newDesc, callback)
{
	twitter.post('account/update_profile',{description: newDesc},callback);
	
}

function setURL(newURL, callback)
{
	twitter.post('account/update_profile',{url: newURL},callback);
	
}
module.exports={
	getDescription: getDescription,
	setDescription: setDescription,
	setURL: setURL
	}
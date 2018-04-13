const twitter = require('../modules');

function getDescription(request,response)
{
	twitter.account.getDescription((error,data,twitterRes)=>{
		if(error)
		{
			response.end('There is an error.');
		}
		else
		{
			response.end(data.description);
		}
	
	});
}

function setDescription(request,response)
{
	
	var newDesc=request.body['newDesc'];
	twitter.account.setDescription(newDesc, (error,data,twitterRes)=>{
		if(error)
		{
			response.end('There is an error.');
		}
		else
		{
			response.end(data.description);
		}
	
	});
}

function setURL(request,response)
{
	var newURL=request.body['url'];
	twitter.account.setURL(newURL, (error,data,twitterRes)=>{
		if(error)
		{
			response.end('There is an error.');
		}
		else
		{
			response.end(data.url);
		}
	
	});
	
}


module.exports={
	getDescription: getDescription,
	setDescription: setDescription,
	setURL: setURL
	
	}
const twitter = require('../modules');

function getDescription(request,response)
{
	twitter.account.getDescription((error,data,twitterRes)=>{
		if(error) {
			response.status(error.statusCode).json({
				status: "ERROR",
				data: error
			});
		}
		else {
			response.status(twitterRes.statusCode).json({
				status: "SUCCESS",
				data: data.description
			});
		}
	
	});
}

function setDescription(request,response) {
	let newDesc=request.body['newDesc'];
	twitter.account.setDescription(newDesc, (error,data,twitterRes)=>{
        if(error) {
            response.status(error.statusCode).json({
                status: "ERROR",
                data: error
            });
        }
        else {
            response.status(twitterRes.statusCode).json({
                status: "SUCCESS",
                data: data.description
            });
        }
	
	});
}

function setURL(request,response) {
	let newURL=request.body['url'];
	twitter.account.setURL(newURL, (error,data,twitterRes)=>{
        if(error) {
            response.status(error.statusCode).json({
                status: "ERROR",
                data: error
            });
        }
        else {
            response.status(twitterRes.statusCode).json({
                status: "SUCCESS",
                data: data.url
            });
        }
	
	});
	
}


module.exports={
	getDescription: getDescription,
	setDescription: setDescription,
	setURL: setURL
	
	}
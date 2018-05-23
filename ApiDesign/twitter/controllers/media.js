const twitter = require('../modules');

function uploadMediaToServer(request, response){
    response.json({
        status: "SUCCESS",
        data: request.file
    });
}

function uploadMediaToTwitter(request, response) {
    const imagePath = request.body['imagePath'];
    twitter.media.tweetImageToTwitter(imagePath, function(err, data, twResponse) {
        if (err) {
            response.status(err.statusCode).json({
                status: "ERROR",
                data: err
            });
        } else {
            const tweetText = request.body['tweetText'];
            twitter.tweets.postTweetWithMedia(tweetText, data.media_id_string, function (err1, data1, twResponse1) {
                if (err1) {
                    response.status(err1.statusCode).json({
                        status: "ERROR",
                        data: err1
                    });
                } else {
                    response.status(twResponse1.statusCode).json({
                        status: "SUCCESS",
                        data: "You tweeted successfully!"
                    });
                }
            });
        }
    });
}

module.exports = {
    uploadMediaToTwitter: uploadMediaToTwitter,
    uploadMediaToServer: uploadMediaToServer
};
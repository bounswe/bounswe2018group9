const twitter = require('../modules');

function getFollowers(request, response) {
    var screenName = request.query.screen_name;
    twitter.followers.getFollowers(screenName, (error, data, twitterResponse) => {
        if (error) {
            console.log(error);
            response.json({
                status: "ERROR",
                error: error
            });
        } else if(screenName){
            const followersArray = [];
            const numOfFollowers = data.users.length;
            for (let i=0; i < numOfFollowers; i++){
                const twFollower = data.users[i]
                const follower = {
                    id: twFollower.id,
                    name: twFollower.name,
                    screenName: twFollower.screen_name,
                    description: twFollower.description,
                    profileImageUrl: twFollower.profile_image_url
                };
                followersArray.push(follower);
            }
            response.json({
                status: "SUCCESS",
                data: followersArray
            });
        } else {
            response.json({
                status: "ERROR",
                error: "Please provide query: screen_name"
            })
        }
    });

}

module.exports = {
    getFollowers : getFollowers
};
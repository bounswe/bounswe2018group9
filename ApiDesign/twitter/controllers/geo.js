const twitter = require('../modules');

function getInfoAboutPlace(request, response) {
    let lat = request.query.lat;
    let long = request.query.long;
    twitter.geo.getInfoAboutPlace(lat, long, (error, data, twitterResponse) => {
        if (error) {
            console.log(error);
            response.json({
                status: "ERROR",
                error: error
            });
        } else if(lat && long){
            const locations = [];
            for(let i=0; i<data.result.places.length; i++){
                locations.push({
                    name: data.result.places[i].full_name,
                    country: data.result.places[i].country,
                    type: data.result.places[i].place_type
                });
            }
            response.json({
                status: "SUCCESS",
                data: locations
            });
        } else {
            response.json({
                status: "ERROR",
                error: "Please provide query: lat and long"
            })
        }
    });

}

module.exports = {
    getInfoAboutPlace : getInfoAboutPlace
};
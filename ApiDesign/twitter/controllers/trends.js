const twitter = require('../').modules;

function getTrendsForCountry(request, response) {
    console.log(request);
    let countryName = request.params.countryName; 
    twitter.trends.getTrendsForCountry(countryName, (error, data, twitterRes) => {
        if (data != null) {
            const trends = data[0].trends;
            const res = [];
            for(let trend of trends){
                tempTrend = {
                    "name":trend.name,
                    "url":trend.url
                };
                res.push(tempTrend);
            }
            response.end(JSON.stringify(res));
        } else {
            response.end('No trend is retrieved');

        }
    });
}

module.exports = {
    getTrendsForCountry: getTrendsForCountry
};
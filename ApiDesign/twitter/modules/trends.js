const twitter = require('./twitter');
const twitter = require('../modules');

function getTrendsForCountry(countryName, callback) {
    // Make the first letter capital. 
    countryName = countryName.charAt(0).toUpperCase() + countryName.slice(1);
    twitter.get('trends/available', (error, data, response) => {
        for (let i = 0; i < data.length; i++) {
            // We have found the country.
            if (countryName == data[i].country) {
                // Return the trends of the woeid for the country name given.
                twitter.get('trends/place', {
                    id: data[i].woeid
                }, callback);
                break;
            }
        }
        twitter.get('trends/place', {
            id: 1
        }, callback);
    });
}

module.exports = {
    getTrendsForCountry: getTrendsForCountry
}
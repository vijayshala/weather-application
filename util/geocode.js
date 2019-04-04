const request = require('request');
 
getGeocode = (address , callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/ ' + address +' .json?access_token=pk.eyJ1Ijoia2VzaGF2MTIzIiwiYSI6ImNqdHF2a3oyZjAya280YXAyNGYwOGN3ZmQifQ.GwELdee3F7QUAN5Zz7DT8A&limit=1'

    request({'url':url , 'json' : true}  , (error , res) => {
        if(error) {
            callback('unable to find location services' , undefined)
        } else if (res.body.features.length === 0) {
            callback('Unable to find the location , Try another search' , undefiend)
        } else {
            callback(undefined , {
                'lattitude' : res.body.features[0].center[1],
                'longitude' : res.body.features[0].center[0],
                'location'  : res.body.features[0].place_name
            })
        }
    });
};

 
module.exports = {
    'getGeocode' : getGeocode
}

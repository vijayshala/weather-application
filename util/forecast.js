const request = require('request');
 
getForecast = (lattitude ,longitude , callback) => {
    const url = 'https://api.darksky.net/forecast/5d2739dd355fde509b21f627aa432bdb/'+ lattitude+','+longitude +'?units=si';
    request({'url':url, 'json' : true}  , (error , res) => {
        if(error){
            callback('unable to connet weather services' , undefined)
        } else if (res.body.error) {
            callback('unable to find location' , undefined)
        } else {
            //callback(undefined , res.body.daily.data[0].summary +' it is currently ' + res.body.currently.temperature + ' out there . there is ' +  res.body.currently.precipProbability + ' chance of rain')
            callback(undefined , {
                forecast : res.body.currently.summary,
                location : res.body.timezone
            });
        };
    });
};

module.exports = {
    'getForecast' : getForecast 
}

const request = require('request')

const forecast = (lat, lon, call) => {
    const url = 'http://api.weatherstack.com/current?access_key=561be77bd53b4c7cf81556d52f138425&query=' + lat + ',' + lon + '&units=m'
    request({ url: url, json: true }, (error, {body}) => { 
        ////{body} === response.body
        if (error) {
            call('Unable to connect to weather services:(', undefined)
        }
        else if (body.error) {
            call('Unable to find provided location  +_+  Try another relavant search:)', undefined)
        }
        else { 
            const data = body.current
            call(undefined, data.weather_descriptions[0] + ". Current temperature is " + (data.temperature) + "C and there are "+ data.precip +"% chances of rain." + " It feels like " + (data.feelslike) + "C with humidity of " + data.humidity + ". " + "UV index is " + (data.uv_index )+ " and visibility is " + (data.visibility) + ".")
        }
    })
}
module.exports = forecast
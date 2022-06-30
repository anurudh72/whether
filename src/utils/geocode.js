const request = require('request')

const geocode = (address, call) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=0154d257ca41f4be594bf05015a9b115&query=' + address
    request({ url: url, json: true }, (error, {body}) => {
        // {body}=== respnse.body deSTRUCTURING
        if (error) {
            call('Unable to connect to location services:(', undefined)
        }
        else if(body.error) {
            call('Enter at least 3 characters:)', undefined)
        }
        else if (body.data.length === 0) {
            call('Unable to find provided location  +_+ Try another relavant search:)', undefined)
        }
        else {
            call(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                location: body.data[0].label
            })
        }
    })
}

module.exports = geocode
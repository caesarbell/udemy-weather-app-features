const appApi = require('../utils/appApiCalls');

exports.handler = function(event, context, callback) {

    console.log('event', event.body);

    const address = event.body.address; 
    const forcast = event.body.forcast;

    console.log('address passed in', address);

    appApi.getWeather(address, forcast)
        .then((res) => {
            console.log('res', res);

            callback(null, {
                statusCode: 200,
                header: {
                    'Content-Type': 'application/json'
                },
                body: 'working'
            })
        })
        .catch(callback)

}
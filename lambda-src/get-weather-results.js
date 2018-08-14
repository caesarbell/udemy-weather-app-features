const appApi = require('../utils/appApiCalls');

exports.handler = function(event, context, callback) {

    console.log('event', event.body);

    const results = JSON.parse(event.body);

    const address = results.address; 
    const forcast = results.forcast;
    

    appApi.getWeather(address, forcast)
        .then((res) => {
            console.log('res', res);

            callback(null, {
                statusCode: 200,
                body: JSON.stringify(res)
            })
        })
        .catch(callback)

}
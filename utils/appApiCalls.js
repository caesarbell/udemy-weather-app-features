"use strict";

const request = require('request');
const { get, forEach, toLower } = require('lodash');
const axios = require('axios');
const moment = require('moment');


const util = require('./config/config');


const forecastFeature = ( res, forcast ) => {
  const results = []; 

  forEach( res[forcast].data, (day) => {
    const days = moment(day.time * 1000).format('dddd');

    console.log(`${days} temperature high is ${day.temperatureHigh} and temperature low is ${day.temperatureLow}`);

    results.push(`${days} temperature high is ${day.temperatureHigh} and temperature low is ${day.temperatureLow}`); 

    return results; 
  });
}


const getWeather = ( address, forcast ) => {

  console.log( 'address', address); 

  const addressUrl = util.geoApi;

  return axios.get(addressUrl, {
    params: {
      address: address
    }
  })
  .then(( response ) => {

    if ( response.data.status == 'ZERO_RESULTS') throw new Error ('Unable to find the address.')

    const results = response.data.results[0];
    const address = get(results, 'formatted_address', '');
    const location = get(results, ['geometry', 'location'], '');
    const latitude = location.lat;
    const longitude = location.lng;


    //console.log('The weather based on this address:', address);

    const weatherUrl = util.forecastApi;
    const weatherAPIKey = process.env.WEATHERAPI;

    const param = {
        lat : encodeURIComponent(latitude),
        long: encodeURIComponent(longitude)
      }

    return axios.get(`${weatherUrl}/${weatherAPIKey}/${latitude},${longitude}`);

  })
  .then( (res) => {

    //console.log('res', JSON.stringify(res.data.daily, undefined, 2));

    const temperature = res.data.currently.temperature;
    const apparentTemperature = res.data.currently.apparentTemperature;

    //console.log(`current temperature is, ${temperature}, but it actually feels like ${apparentTemperature}`);

    console.log('forcast', forcast);

    const results = '';

    switch (toLower(forcast)) {
      case 'daily':
        forecastFeature( res.data, forcast );
        break;
      case 'mintue':
        console.log('This feature coming soon.');
        break;
      case 'hourly':
        console.log('This feature coming soon');
        break;
      default:
        console.log(`current temperature is, ${temperature}, but it actually feels like ${apparentTemperature}`);
        return results = `current temperature is, ${temperature}, but it actually feels like ${apparentTemperature}`;
        
    }

  })
  .catch(( error ) => {
    if ( error.code == 'ENOTFOUND' ) return console.log('Unable to connect to serve API');

    console.log(error.message);
  })

}



module.exports = {
  getWeather
};

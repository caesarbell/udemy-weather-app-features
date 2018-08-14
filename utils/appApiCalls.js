"use strict";

const request = require('request');
const { get, forEach, toLower } = require('lodash');
const axios = require('axios');
const moment = require('moment');


const util = require('./config/config');


const forecastFeature = ( res, forcast ) => {
  const results = []; 
  console.log('res', res.daily);

  forEach( res[forcast].data, (day) => {
    const days = moment(day.time * 1000).format('dddd');

    results.push({day: days, hight: day.temperatureHigh, low: day.temperatureLow}); 

  });

  return results; 
}


const getWeatherLocationData = (url, key, lat, long) => {

  return axios.get(`${url}/${key}/${lat},${long}`)
    .then((res) => {
        console.log('status in get location data', res.status); 

      if (res.status === 400) throw new Error('Connection issue, try again'); 

        return res; 
    })

}

const getLatAndLong = (url, address) => {

  return axios.get(url, {
    params: {
      address: address
    }
  }).then((res) => {

    console.log('status in get lat', res.status); 

    return res; 
  }); 

}


 const getWeather = ( address, forcast ) => {

  console.log( 'address', address); 

  const addressUrl = util.geoApi;

  return getLatAndLong(addressUrl, address)
    .then(( response ) => {

      console.log('response status', response.status);

      if (response.data.status == 'ZERO_RESULTS') throw new Error('Unable to find the address.');

      const results = response.data.results[0];
      const location = get(results, ['geometry', 'location'], '');
      const latitude = location.lat;
      const longitude = location.lng;


      console.log('The weather based on this address:', address);

      const weatherUrl = util.forecastApi;
      const weatherAPIKey = process.env.WEATHERAPI;


      const param = {
          lat : encodeURIComponent(latitude),
          long: encodeURIComponent(longitude)
        }

      return getWeatherLocationData(weatherUrl, weatherAPIKey, latitude, longitude); 

    })
    .then( (res) => {

      const temperature = res.data.currently.temperature;
      const apparentTemperature = res.data.currently.apparentTemperature;


      return forecastFeature(res.data, forcast);

    })
    .catch(( error ) => {

      console.log('error message', error.message);
      return error.message; 
    })

}



module.exports = {
  getWeather
};

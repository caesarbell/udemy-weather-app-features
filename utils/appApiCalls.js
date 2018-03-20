"use strict";

const request = require('request');
const { get } = require('lodash');

const util = require('./config/config');



const geoCodeAddress = (address, callback) => {

  const url = util.geoApi;
  const param = {
    address : encodeURIComponent(address)
  }

  request({
    url: `${url}?address=${param.address}`,
    json: true
  }, (error, response, body) => {
    /**
    * if you want to pretty print the object you can run
    * JSON.stringify( body , undefined, 2) // 2 being the number of indents
    */

    if ( error ) return callback('Unable to connect to google server.');

    if ( body.status == 'ZERO_RESULTS') return callback('Unable to find address.');

    if ( body.status === 'OVER_QUERY_LIMIT') return callback(body.error_message);


    const results = body.results[0];
    const address = get(results, 'formatted_address', '');
    const location = get(results, ['geometry', 'location'], '');
    const latitude = location.lat;
    const longitude = location.lng;


    callback(undefined, {
      address: address,
      latitude: latitude,
      longitude: longitude
    });

  })

}


const getWeather = (lat, long, address, callback) => {

  const url = util.forecastApi;
  const weatherAPIKey = process.env.WEATHERAPI;


  const param = {
    lat : encodeURIComponent(lat),
    long: encodeURIComponent(long)
  }

  request({
    url: `${url}/${weatherAPIKey}/${lat},${long}`,
    json: true
  }, (error, response, body) => {

    if ( error ) return callback('Unable to connect to Forecast.io server');

    if ( response.statusCode === 404 ) return callback('Unable to fetch weather');

    callback(undefined, {
      temperature: body.currently.temperature,
      apparentTemperature: body.currently.apparentTemperature
    });
  });
};


module.exports = {
  geoCodeAddress,
  getWeather
};

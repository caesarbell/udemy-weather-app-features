"use strict";

const yargs = require('yargs');
const { get } = require('lodash');

const appApi = require('./utils/appApiCalls');

const argv = yargs
  .options({
    address: {
      describe: 'The flag that accpets a users address',
      demandOption: true,
      string: true,
      alias: 'a'
    }
  })
  .help()
  .alias('help', 'h')
  .argv;


const userInput = get(argv, 'address', '') ? get(argv, 'a', '') : get(argv, 'address', '');


/* geoCodeAddress is going to take a value, and a callback function */
appApi.geoCodeAddress(userInput, (error, results) => {
  if ( error ) return console.log('Address error message: ', error);

  console.log('results', results);
  console.log('latitude', results.latitude);
  console.log('longitude', results.longitude);

  //return console.log('results: ', JSON.stringify(results, undefined, 2));
  appApi.getWeather(results.latitude, results.longitude, results.address, (errorMessage, weatherResults) => {

    console.log('weather results ', weatherResults);

    if ( errorMessage ) return console.log('Weather error message', errorMessage);

    return console.log(`It's currently ${weatherResults.temperature}, but it feels like ${weatherResults.apparentTemperature}`);
  });
});

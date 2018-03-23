"use strict";

const yargs = require('yargs');
const { get } = require('lodash');

const appApi = require('./utils/appApiCalls');

const argv = yargs
  .options({
    address: {
      describe: 'Enter the deisre address',
      demandOption: true,
      string: true,
      alias: 'a'
    },
    forcast: {
      describe: 'Provide what type of forcast you want daily, hourly',
      string: true,
      alias: 'f'
    }
  })
  .help()
  .alias('help', 'h')
  .argv;


let address = get(argv, 'address', '') ? get(argv, 'a', '') : get(argv, 'address', '');
let forcast = get(argv, 'forcast', '') ? get(argv, 'f', '') : get(argv, 'forcast', '');

if ( !address ) {
  /* Default address */
  address = '10469';
}

if ( !forcast ) {
  forcast = 'nothing selected';
}


/* geoCodeAddress is going to take a value, and a callback function */
appApi.getWeather( address, forcast );

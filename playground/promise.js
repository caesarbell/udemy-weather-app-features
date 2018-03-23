"use stric";

const request = require('request');
const { get } = require('lodash');

const util = require('../utils/config/config');

const somePromise = new Promise((resolve, reject) => {
  /*
  * You can either resolve or reject a promise once
  * You can't do either twice ( can't resolve a promise twice, or reject a promise twice)
  * Compared to callback it reduces coder errors (i.e calling a callback fuction twice)
  * Before a promise hits either resolve or reject state it starts in a pending state
  */

  // setTimeout simulates a delay (like a real api call)
  setTimeout(() => {

    resolve({
      status: 200,
      message: 'Hey it worked'
    });

    reject({
      state: 400,
      message: 'Unable to fill promise'
    });

  }, 2500);
})
.then((results) => {
  console.log('Result status:', results.status, ' Success: ', results.message);
})
.catch((err) => {
  console.log('Error Status ', err.status, ' Error: ', err.message);
});

const asyncAdd = ( a, b ) => {
  return new Promise(( resolve, reject ) => {
    setTimeout(() => {

      if( typeof a === 'number' && typeof b === 'number') {
        resolve( a + b );
      }

      const val1 = typeof a;
      const val2 = typeof b;
      const results = `Wrong value type, expected type number, type recieved for value 1 is ${val1}, type recieved for value is ${val2}`
      reject( results );

    }, 1500)
  });
}

const geoCodeAddress = (address) => {
  return new Promise( (resolve, reject) => {

    const url = util.geoApi;
    const param = {
      address: encodeURIComponent(address)
    }

    request({
      url: `${url}?address=${param.address}`,
      json: true
    }, (error, response, body) => {

      if( error ) reject( 'Unable to connect to google server');

      if( body.status == 'ZERO_RESULTS' ) reject( 'Unable to find address.' );

      if ( body.status === 'OVER_QUERY_LIMIT') reject( body.error_message );


      const results = body.results[0];
      const address = get(results, 'formatted_address', '');
      const location = get(results, ['geometry', 'location'], '');
      const latitude = location.lat;
      const longitude = location.lng;

      resolve({
        address: address,
        latitude: latitude,
        longitude: longitude
      })
    })
  });
};

module.exports = {
  asyncAdd,
  geoCodeAddress
};

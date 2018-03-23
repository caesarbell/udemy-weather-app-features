"use strict";

const playGroundMethod = require('../promise');

playGroundMethod.geoCodeAddress('12601')
.then(( results ) => {
  console.log('Results:', JSON.stringify(results, undefined, 2));
})
.catch(( err ) => {
  console.log('Error:', err);
})

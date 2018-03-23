"use strict";
const playGroundMethod = require('../promise');

playGroundMethod.asyncAdd(1, 2)
.then(( result ) => {
  console.log('Success: The sum is ', result );
  return new Promise( (resolve, reject) => {
    resolve( result + 10);
  })
  .then(( total ) => {
    console.log('Total is now: ', total);
  });
})
.catch((err) => {
  console.log('Error Message: ', err);
})

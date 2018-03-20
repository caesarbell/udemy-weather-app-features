/* Example of a Callback */

const getUser = ( id, callback ) => {
  const user = {
    id: id,
    name: 'Caesar'
  };

  setTimeout(() => {
    callback( user );
  }, 3000);
};

getUser(32, (user) => {
  console.log('User', user);
});

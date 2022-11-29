const { addingProfileHandler } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/validate_me',
    handler: addingProfileHandler,
  }
];

module.exports = routes;
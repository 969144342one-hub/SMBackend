const serverless = require('serverless-http');
const app = require('./indexd:\mern-server\.github');

// Wrap the Express app with serverless-http
module.exports.handler = serverless(app);
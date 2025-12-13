import serverless from 'serverless-http';
const app = require('./indexd.js');

// Wrap the Express app with serverless-http
export const handler = serverless(app);
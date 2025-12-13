import serverless from 'serverless-http';
import app from './index.js';

// Wrap the Express app with serverless-http
export const handler = serverless(app);
const express = require('express');
const logger = require('../util');

/**
 * Create a basic server which listens for inbound requests on PORT 5000
 * Sends back text response to all requests.
 */

const PORT = 5000;
const app = express();

app.get('/*', (req, res) => {
  logger(__filename, 'GET / on', PORT);
  res.send('Welcome to express server');
});

app.listen(PORT, () => {
  logger(__filename, 'Express server started on port', PORT);
});

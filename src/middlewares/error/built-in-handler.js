const logger = require('../../util');

const express = require('express');

/**
 * express built in error handler
 */

const PORT = 5301;

const app = express();

app.get('/builtin', (req, res) => {
  logger(`${__filename}`, 'GET /builtin on', PORT);
  throw Error('This error is handled by default express error handler');
});

app.listen(PORT, () => {
  logger(__filename, 'Express server started on port', PORT);
});

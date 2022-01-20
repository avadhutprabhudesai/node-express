const logger = require('../util');

const express = require('express');

/**
 *  Route handlers
 *    Multiple callbacks
 *    Callbacks array
 *    Combination of callbacks and array
 */

const PORT = 5103;

const app = express();

// Multiple callbacks
app.get(
  '/users/',
  (req, res, next) => {
    logger(`${__filename}`, 'GET /users/ first callback on', PORT);
    next();
  },
  (req, res) => {
    logger(`${__filename}`, 'GET /users/ second callback on', PORT);
    res.end('Response from second handler\n');
  }
);

const handlersArr = [
  (req, res, next) => {
    logger(`${__filename}`, 'GET /books/ first callback on', PORT);
    next();
  },
  (req, res, next) => {
    console.log(__filename);
    logger(`${__filename}`, 'GET /books/ second callback on', PORT);
    next();
  },
  (req, res) => {
    logger(`${__filename}`, 'GET /books/ third callback on', PORT);
    res.end('Response received from third callback in the array');
  },
];

// Callback array
app.get('/books/', handlersArr);

// Callback array/function combo
app.get(
  '/products/',
  (req, res, next) => {
    logger(`${__filename}`, 'GET /books/ 0th callback on', PORT);
    next();
  },
  handlersArr
);

app.listen(PORT, () => {
  logger(__filename, 'Express server started on port', PORT);
});

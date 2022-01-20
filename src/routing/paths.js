const logger = require('../util');
const express = require('express');

/**
 *  Strings
 *  Strings patterns
 *  Regular expressions
 *
 */

const PORT = 5101;

const app = express();

// String exact match
app.get('/exact', (req, res) => {
  logger(`${__dirname.split('src')[1]}`, 'GET /exact on', PORT);
  res.end('Exact string matching with /exact');
});

// String pattern ?
app.get('/users?', (req, res) => {
  logger(`${__dirname.split('src')[1]}`, 'GET /users? on', PORT);
  res.end('String pattern matching with /users?');
});

// String pattern +
app.get('/user+s', (req, res) => {
  logger(`${__dirname.split('src')[1]}`, 'GET /user+s on', PORT);
  res.end('String pattern matching with /user+s');
});

// String pattern *
app.get('/user*s', (req, res) => {
  logger(`${__dirname.split('src')[1]}`, 'GET /user*s on', PORT);
  res.end('String pattern matching with /user*s');
});

// String pattern ()?
app.get('/mango(es)?', (req, res) => {
  logger(`${__dirname.split('src')[1]}`, 'GET /mango(es)? on', PORT);
  res.end('String pattern matching with /mango(es)?');
});

// Regex
app.get(/^\/auth.*$/, (req, res) => {
  logger(`${__dirname.split('src')[1]}`, 'GET /^/auth.*$/ on', PORT);
  res.end('String pattern matching with /^/auth.*$/');
});

app.listen(PORT, () => {
  logger(__filename, 'Express server started on port', PORT);
});

const logger = require('../util');

const express = require('express');

/**
 *  URL parameters
 *    positional parameters
 *    -
 *    .
 *    regex
 *
 */

const PORT = 5102;

const app = express();

// Positional parameters
app.get('/users/:id', (req, res) => {
  logger(`${__filename}`, 'GET /users/:id on', PORT);
  res.write('Single positional parameter\n');
  res.end(JSON.stringify(req.params));
});

app.get('/users/:id/post/:postId', (req, res) => {
  logger(`${__filename}`, 'GET /users/:id/post/:postId', PORT);
  res.write('Multiple positional parameters\n');
  res.end(JSON.stringify(req.params));
});

app.get('/users/:id/journey/:src-:dest', (req, res) => {
  logger(`${__filename}`, 'GET /users/:id/journey/:src-:dest on', PORT);
  res.write('Positional parameters separated with -\n');
  res.end(JSON.stringify(req.params));
});

app.get('/server/:protocol.:port', (req, res) => {
  logger(`${__filename}`, 'GET /server/:protocol.:port on', PORT);
  res.write('Positional parameters separated with .\n');
  res.end(JSON.stringify(req.params));
});

app.get('/user/:id([0-9]+)', (req, res) => {
  logger(`${__filename}`, 'GET /users/:id(/d+/) on', PORT);
  res.write(
    'Positional parameter using regex. Only digits are allowed as id value\n'
  );
  res.end(JSON.stringify(req.params));
});

app.listen(PORT, () => {
  logger(__filename, 'Express server started on port', PORT);
});

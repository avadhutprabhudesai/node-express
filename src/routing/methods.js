const express = require('express');
const logger = require('../util');

const PORT = 5100;
const app = express();

/**
 *  GET
 *  POST
 *  PUT
 *  PATCH
 *  DELETE
 */

app.get('/', (req, res) => {
  logger(__filename, 'GET / on', PORT);
  res.send('Responding to GET');
});
app.post('/', (req, res) => {
  logger(__filename, 'POST / on', PORT);
  res.send('Responding to POST');
});
app.put('/', (req, res) => {
  logger(__filename, 'PUT / on', PORT);
  res.send('Responding to PUT');
});
app.patch('/', (req, res) => {
  logger(__filename, 'PATCH / on', PORT);
  res.send('Responding to PATCH');
});
app.delete('/', (req, res) => {
  logger(__filename, 'DELETE / on', PORT);
  res.send('Responding to DELETE');
});

app.all('/allReq', (req, res) => {
  logger(__filename, `${req.method.toUpperCase()} /allReq on`, PORT);
  res.send(
    `Responding to ${req.method.toUpperCase()} through app.all("/allReq")`
  );
});

app.listen(PORT, () => {
  logger(__filename, 'Express server started on port', PORT);
});

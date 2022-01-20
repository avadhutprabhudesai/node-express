const logger = require('../../util');
const admin = require('./admin');
const users = require('./users');
const express = require('express');

/**
 * Express.router()
 */

const PORT = 5105;

const app = express();

app.use('/admin', admin);
app.use('/user', users);

app.listen(PORT, () => {
  logger(__filename, 'Express server started on port', PORT);
});

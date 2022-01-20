const logger = require('../util');

const express = require('express');

/**
 * app.route()
 */

const PORT = 5104;

const app = express();

app
  .route('/user')
  .get((req, res) => {
    logger(`${__filename}`, 'GET /user/profile on', PORT);
    res.end('User profile served');
  })
  .post((req, res) => {
    logger(`${__filename}`, 'POST /user/create on', PORT);
    res.end('User profile created');
  });

app.listen(PORT, () => {
  logger(__filename, 'Express server started on port', PORT);
});

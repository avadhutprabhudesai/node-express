/* eslint-disable @babel/new-cap */

const logger = require('../../util');
const router = require('express').Router();

const PORT = 5105;

router.get('/', (req, res) => {
  logger(`${__filename}`, 'GET /user on', PORT);
  res.end('User info');
});

router.post('/create', (req, res) => {
  logger(`${__filename}`, 'POST /user/create on', PORT);
  res.end('User created');
});

module.exports = router;

/* eslint-disable @babel/new-cap */

const logger = require('../../util');
const router = require('express').Router();

const PORT = 5105;

router.get('/', (req, res) => {
  logger(`${__filename}`, 'GET /product on', PORT);
  res.end('Product info');
});

router.post('/create', (req, res) => {
  logger(`${__filename}`, 'POST /product/create on', PORT);
  res.end('Product created');
});

module.exports = router;

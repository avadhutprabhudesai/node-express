/* eslint-disable @babel/new-cap */
const logger = require('../../util');
const router = require('express').Router();

const PORT = 5105;

router.get('/', (req, res) => {
  logger(`${__filename}`, 'GET /admin/dashboard on', PORT);
  res.end('Admin dashboard');
});

router.get('/reports', (req, res) => {
  logger(`${__filename}`, 'GET /admin/dashboard/reports on', PORT);
  res.end('Admin dashboard reports');
});

module.exports = router;

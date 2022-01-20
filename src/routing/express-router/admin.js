/* eslint-disable @babel/new-cap */

const logger = require('../../util');
const router = require('express').Router();
const adminDashboard = require('./admin-dashboard');

const PORT = 5105;
router.use('/dashboard', adminDashboard);

router.get('/', (req, res) => {
  logger(`${__filename}`, 'GET /admin on', PORT);
  res.end('Admin info');
});

router.post('/create', (req, res) => {
  logger(`${__filename}`, 'POST /admin/create on', PORT);
  res.end('Admin created');
});

module.exports = router;

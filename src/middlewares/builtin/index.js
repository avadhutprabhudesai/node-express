const compression = require('compression');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const responseTime = require('response-time');
const logger = require('../../util');

/**
 * Built in middlewares
 *    express.static
 *    express.json
 *    compression
 *    morgan
 *    response-time
 */

const PORT = 5401;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(
  compression({
    level: 9,
  })
);
app.use(morgan('common'));
app.use(responseTime());

app.post('/user/create', (req, res) => {
  logger(`${__filename}`, 'POST /user/create on', PORT);
  logger(`${__filename}`, 'Request body', JSON.stringify(req.body));
  res.set({ 'Accept-Encoding': 'gzip, br, deflate' });
  res.end(
    JSON.stringify({
      ...req.body,
      longString: 'lorem ipsum lorem ipsum'.repeat(50000),
    })
  );
});

app.get('/user/', (req, res) => {
  logger(`${__filename}`, 'GET /user on', PORT);
  res.set({
    'Accept-Encoding': 'gzip, deflate, br',
  });
  res.send('Lorem ipsum'.repeat(10000));
});

app.listen(PORT, () => {
  logger(__filename, 'Express server started on port', PORT);
});

const logger = require('../../util');

const express = require('express');

/**
 * express built in error handler
 */

const PORT = 5302;

const app = express();

app.get('/async/crash', (req, res) => {
  logger(`${__filename}`, 'GET /async/crash on', PORT);
  setTimeout(() => {
    throw Error(
      'This error is not handled by default express error handler. Thus crashes the app'
    );
  }, 1000);
});

app.get('/async/next', (req, res, next) => {
  logger(`${__filename}`, 'GET /async/next on', PORT);

  setTimeout(() => {
    try {
      throw Error(
        'This error is passed on to express default handler using next()'
      );
    } catch (error) {
      next(error);
    }
  }, 1000);
});

app.get('/async/promise/throw', (req, res, next) => {
  logger(`${__filename}`, 'GET /async/promise/throw on', PORT);
  const prom = new Promise((res, rej) => {
    setTimeout(() => {
      // Error raised with throw() is never handled by the catch at the end of promise chain. Hence always use reject()
      throw new Error('Async error originated from Promise');
    }, 1000);
  });

  prom
    .then((val) => {
      logger(`${__filename}`, 'Promise resolved with the value', val);
    })
    .catch(next);
});

app.get('/async/promise/reject', (req, res, next) => {
  logger(`${__filename}`, 'GET /async/promise/reject on', PORT);
  const prom = new Promise((res, rej) => {
    setTimeout(() => {
      rej('Async error originated from Promise');
    }, 1000);
  });

  prom
    .then((val) => {
      logger(`${__filename}`, 'Promise resolved with the value', val);
    })
    .catch(next);
});
app.listen(PORT, () => {
  logger(__filename, 'Express server started on port', PORT);
});

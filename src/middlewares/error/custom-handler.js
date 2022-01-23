const logger = require('../../util');

const express = require('express');

/**
 * express custom error middlewares
 *    non-existent routes
 *    invalid search param
 *    invalid body params
 */

const PORT = 5304;

const app = express();

app
  .route('/search')
  .get((req, res, next) => {
    const { id, name } = req.query;
    if (!id) {
      next({
        type: 'invalidsearch',
      });
    } else {
      res.send({
        id,
        name,
      });
    }
  })
  .post((req, res, next) => {
    const { id, name } = req.params;
    if (!id) {
      next({
        type: 'invalidbody',
      });
    } else {
      res.send({
        id,
        name,
      });
    }
  });

app.all('*', (req, res, next) => {
  next({
    type: 'nonexistent',
  });
});

app.use(nonExistentRoutes);
app.use(invalidSearchParams);
app.use(invalidBodyParams);

app.listen(PORT, () => {
  logger(__filename, 'Express server started on port', PORT);
});

/**
 * =======================
 *
 *
 *  Custom error middlewares
 *
 *
 * =======================
 *
 */

function nonExistentRoutes(err, req, res, next) {
  if (err.type === 'nonexistent') {
    logger(__filename, 'Non existent Route Error Middleware');
    return res.send('This route does not exist');
  }
  next(err);
}

function invalidSearchParams(err, req, res, next) {
  if (err.type === 'invalidsearch') {
    logger(__filename, 'Invalid search params Error Middleware', err);
    return res.send('Invalid search params');
  }
  next(err);
}
function invalidBodyParams(err, req, res, next) {
  if (err.type === 'invalidbody') {
    logger(__filename, 'Invalid body params Error Middleware');
    return res.send('Invalid body params');
  }
  next(err);
}

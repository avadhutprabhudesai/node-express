const logger = require('../util');
const express = require('express');

/**
 *  Application middleware
 *    Ways to bind middleware to app object
 *      app.use()
 *        no mount point
 *        specific mount point
 *      app.METHOD()
 *    Multiple routes
 *      next()
 *      next('route')
 */

const PORT = 5201;

const app = express();
// Convert response body to json. Without this, the response is undefined.
app.use(express.json());

/**
 * =======================
 *
 *
 *  Binding middleware to app object
 *
 *
 * =======================
 *
 */

// middleware without mountpoint. So it is applicable to all routes of this router instance.
app.use(requestLogger);

// middleware with specific mount point. Applicable to this route and its children.
// app.use('/user/create', dataValidator);
app.use('/user/create', (req, res, next) => {
  next();
});

// middleware with app.METHOD()
app.get('/user/:id', (req, res) => {
  logger(`${__filename}`, 'GET /user/:id on', PORT);
  res.end('User served');
});

// middleware with app.METHOD()
app.post('/user/create', (req, res) => {
  logger(`${__filename}`, 'POST /user/create on', PORT);
  res.end('User created');
});
app.get('/user/create', (req, res) => {
  logger(`${__filename}`, 'POST /user/create on', PORT);
  res.end('User served');
});

/**
 * =======================
 *
 *
 *  Multiple routes for a path
 *
 *
 * =======================
 *
 */

//
app.get(
  '/product/:category/:id',
  (req, res, next) => {
    console.log(`\n\n======== Product Info request details ======== `);
    const {
      params: { category, id },
    } = req;
    console.log(`category: ${category}`);
    console.log(`id: ${id}`);
    console.log('\n\n');
    next();
  },
  (req, res) => {
    res.send('Skipping next route for this request');
  }
);

app.get('/product/:category/:id', (req, res, next) => {
  logger(`${__filename}`, 'GET /product/:category/:id on', PORT);
  res.end(JSON.stringify(req.params));
});

app.post(
  '/product/create',
  (req, res, next) => {
    logger(`${__filename}`, 'POST /product/create on', PORT);
    const {
      body: { type },
    } = req;

    if (!type) {
      next('route');
    } else {
      next();
    }
  },
  (req, res) => {
    res.send('Product created');
  }
);

app.post('/product/create', (req, res, next) => {
  logger(`${__filename}`, 'POST /product/create on', PORT);
  res.status(500).send('Please add type field for a product');
});

app.listen(PORT, () => {
  logger(__filename, 'Express server started on port', PORT);
});

/**
 * =======================
 *
 *
 *  Utility functions used as middlewares
 *
 *
 * =======================
 *
 */

function requestLogger(req, res, next) {
  console.log(`\n\n======== Request logger on ${PORT} ======== `);
  console.log(`ip: ${req.ip}`);
  console.log(`hostname: ${req.hostname}`);
  console.log(`============================================\n\n`);
  next();
}

function dataValidator(req, res, next) {
  console.log(`\n\n======== Data validator on ${PORT} ======== `);
  console.log(req.body);
  const {
    body: { id },
  } = req;

  if (id) {
    next();
  } else {
    res.end('Valid id is required to create a user.');
  }
  console.log(`============================================\n\n`);
}

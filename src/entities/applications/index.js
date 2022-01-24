const logger = require('../../util');

const express = require('express');
const path = require('path');
const PORT = 5501;

const app = express();

/**
 *  app api methods
 *    HTTP
 *      all()
 *      param()
 *    Templating engine
 *      app.engine
 *    Settings
 *      app.set
 */

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'public/views'));
app.set('env', 'production');

// explicitly tell express to use pug.__express to render html files
app.engine('html', require('pug').__express);

/**
 * app.all()
 */
app.all('/all', (req, res) => {
  res.send('This route listens to all HTTP methods on /all');
});

/**
 * app.param()
 *    single param
 *    param array
 */
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Jane' },
];

const airports = {
  CHI: 'Chicago',
  MOW: 'Moscow',
  NYC: 'New York',
};

app.param('user', (req, res, next, id) => {
  const user = users.find((u) => u.id == id);
  if (user) {
    req.user = user;
    next();
  } else {
    next(new Error('User not found'));
  }
});

app.param(['src', 'dest'], (req, res, next, id) => {
  if (airports[id]) {
    if (!req.src) {
      req.src = airports[id];
    } else {
      req.dest = airports[id];
    }
    next();
  } else {
    next(new Error('Invalid IATA code'));
  }
});

app.get('/user/:user', (req, res) => {
  logger(`${__filename}`, 'GET /user/:user on', PORT);
  res.send(req.user);
});

app.get('/boarding/:src/:dest', (req, res) => {
  logger(`${__filename}`, 'GET /boarding/:src/:dest on', PORT);
  res.send({
    src: req.src,
    dest: req.dest,
  });
});

app.get('/pug', (req, res) => {
  res.render('base', {
    title: 'This is rendered with pug template engine',
    message: 'A sample message',
  });
});

app.get('/layout', (req, res) => {
  res.render('layout.html');
});

app.use((err, req, res, next) => {
  res.send(err.message);
});

app.listen(PORT, () => {
  logger(__filename, 'Express server started on port', PORT);
});

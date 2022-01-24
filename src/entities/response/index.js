const express = require('express');
const pug = require('pug');
const cookieParser = require('cookie-parser');
const logger = require('../../util');
const path = require('path');

const PORT = 5503;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.engine('html', pug.__express);

/**
 *  Methods
 *    ====Header====
 *    res.append()
 *    res.get()
 *    res.set()
 *    res.type()
 *    ====Content-as-attachment====
 *    res.attachment()
 *    res.download()
 *    ====Content====
 *    res.sendFile()
 *    res.format()
 *    res.json()
 *    res.render()
 *    res.send()
 *    res.end()
 *    ====Status====
 *    res.sendStatus()
 *    res.status()
 *
 */

app.get('/header/:mode', (req, res) => {
  logger(`${__filename}`, 'GET /header/:mode on', PORT);
  const {
    params: { mode },
  } = req;

  res.set({
    'accept-encoding': 'gzip',
  });

  switch (mode) {
    case 'append':
      res.append('accept-encoding', 'br');
      break;
    case 'set':
      res.set('accept-encoding', 'gzip, deflate');
      break;
    case 'type':
      res.type('text');
      break;

    default:
      break;
  }
  console.log('\n=============== Header method =============== ');
  console.log(`res.${mode}()`);
  console.log('===========================================\n');
  res.end(`Response method for header res.${mode}()`);
});

app.get('/content-attach/:mode', (req, res) => {
  logger(`${__filename}`, 'GET /content-attach/:mode on', PORT);

  const {
    params: { mode },
  } = req;

  switch (mode) {
    case 'attachment':
      res.attachment('attachment.txt');
      res.end('Content added via res.end()');
      break;
    case 'download':
      res.download(
        path.join(__dirname, 'sample.txt'),
        'sample-attachment.txt',
        (err) => {
          if (err) {
            console.log(
              '\n\n====Error in sending the file via res.download()===='
            );
            console.log(err);
          } else {
            console.log('\n\n====res.download() successful====');
            res.end();
          }
        }
      );
      break;

    default:
      break;
  }
  console.log('\n=============== Content-as-Attachment =============== ');
  console.log(`res.${mode}()`);
  console.log('===========================================\n');
});

app.get('/content/:mode', (req, res) => {
  logger(`${__filename}`, 'GET /content/:mode on', PORT);

  const {
    params: { mode },
  } = req;

  switch (mode) {
    case 'sendFile':
      res.sendFile(path.join(__dirname, 'view.html'), (err) => {
        if (err) {
          console.log(
            '\n\n====Error in sending the file via res.sendFile()===='
          );
          console.log(err);
        } else {
          console.log('\n\n====res.sendFile() successful====');
          res.end();
        }
      });
      break;
    case 'format':
      res.format({
        html: function () {
          res.send('<h1>An html string</h1>');
        },
        text: function () {
          res.send('Plain text');
        },
        json: function () {
          res.send({
            id: 1,
          });
        },
      });
      break;

    case 'json':
      res.json({
        id: 1,
      });
      break;

    case 'render':
      res.render(path.join(__dirname, 'view.html'));
      break;
    case 'send':
      res.send([1, 2, 3, 4]);
      break;
    case 'end':
      res.end();
      break;

    default:
      break;
  }
  console.log('\n=============== Content =============== ');
  console.log(`res.${mode}()`);
  console.log('===========================================\n');
});

app.get('/status/:mode', (req, res) => {
  logger(`${__filename}`, 'GET /status/:mode on', PORT);

  const {
    params: { mode },
  } = req;

  switch (mode) {
    case 'sendStatus':
      res.sendStatus(403);
      break;
    case 'status':
      res.status(400).send('Bad Request');
      break;

    default:
      break;
  }
  console.log('\n=============== Content =============== ');
  console.log(`res.${mode}()`);
  console.log('===========================================\n');
});

app.listen(PORT, () => {
  logger(__filename, 'Express server started on port', PORT);
});

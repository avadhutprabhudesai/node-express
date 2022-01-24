const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const multer = require('multer');
const path = require('path');

const logger = require('../../util');
require('./ui-server');

/**
 * third party middleares
 *    CORS
 *    multer
 *    helmet
 */

const PORT = 5402;
const FILE_PATH = path.join(__dirname, '/upload');

const app = express();

const upload = multer({
  dest: `${FILE_PATH}/`,
});

app.use(cors());
app.use(helmet());

app.get('/different-origin', (req, res) => {
  logger(`${__filename}`, 'GET /different-origin on', PORT);
  res.send(
    JSON.stringify({
      id: 1,
      name: 'John',
      origin: `This response has been sent from ${PORT}`,
    })
  );
});

app.post('/single-upload', upload.single('avatar'), (req, res) => {
  logger(`${__filename}`, 'GET /single-upload on', PORT);
  const avatar = req.file;
  console.log(avatar);
  res.send('file received');
});

app.listen(PORT, () => {
  logger(__filename, 'Express server started on port', PORT);
});

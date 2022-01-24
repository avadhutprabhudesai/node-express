const express = require('express');
const path = require('path');
const logger = require('../../../util');

const PORT = 5403;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  logger(__filename, 'Express server started on port', PORT);
});

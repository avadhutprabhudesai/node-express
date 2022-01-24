const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('../../util');

const PORT = 5502;

const app = express();

app.use(express.json());
app.use(cookieParser());

/**
 *  Properties
 *    baseUrl
 *    path
 *    originalUrl
 *    route
 *
 *    ip
 *    protocol
 *    hostname
 *
 *    body
 *    cookies
 *    params
 *    query
 *  Methods
 *    accepts
 *    is
 *    get
 *
 */

app.get('/props/:id', (req, res) => {
  logger(`${__filename}`, 'GET /props/:id on', PORT);
  const props = {
    urlProps: {
      'baseUrl: ': req.baseUrl,
      'originalUrl: ': req.originalUrl,
      'path: ': req.path,
    },
    networkProps: {
      'ip: ': req.ip,
      'hostname: ': req.hostname,
      'protocol: ': req.protocol,
    },
    parameterProps: {
      'body: ': req.body,
      'cookies: ': req.cookies,
      'params: ': req.params,
      'query: ': req.query,
    },
  };
  console.log('\n=============== URL Props =============== ');
  console.log(props.urlProps);
  console.log('===========================================\n');
  console.log(props.networkProps);
  console.log('\n=============== Network Props =============== ');
  console.log('===========================================\n');
  console.log('\n=============== Parameters =============== ');
  console.log(props.parameterProps);
  console.log('===========================================\n');
  res.end(JSON.stringify(props));
});

app.get('/methods', (req, res) => {
  logger(`${__filename}`, 'GET /methods on', PORT);
  const props = {
    urlProps: {
      'baseUrl: ': req.baseUrl,
      'originalUrl: ': req.originalUrl,
      'path: ': req.path,
    },
    networkProps: {
      'ip: ': req.ip,
      'hostname: ': req.hostname,
      'protocol: ': req.protocol,
    },
    parameterProps: {
      'body: ': req.body,
      'cookies: ': req.cookies,
      'params: ': req.params,
      'query: ': req.query,
    },
  };
  console.log('\n=============== URL Props =============== ');
  console.log(props.urlProps);
  console.log('===========================================\n');
  console.log('\n=============== Network Props =============== ');
  console.log(props.networkProps);
  console.log('===========================================\n');
  console.log('\n=============== Parameters =============== ');
  console.log(props.parameterProps);
  console.log('===========================================\n');

  const methods = {
    acceptsHtml: req.accepts('html'),
    acceptsApplicationJson: req.accepts('application/json'),
    getContentType: req.get('content-type'),
  };
  console.log('\n=============== Methods =============== ');
  console.log('req.accepts("html")', req.accepts('html'));
  console.log(
    'req.accepts("application/json")',
    req.accepts('application/json')
  );
  console.log('===========================================\n');

  res.end(JSON.stringify(methods));
});

app.listen(PORT, () => {
  logger(__filename, 'Express server started on port', PORT);
});

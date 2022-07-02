const express = require('express');
const { errorHandlers } = require('./middleware');
const router = require('./router');

const app = express();

app.use(
  express.json({
    type: 'application/vnd.api+json',
  })
);

app.use('/api', router);

app.use(errorHandlers.dbErrorHandler, errorHandlers.errorHandler);

module.exports = app;

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

function createMiddleware() {
  const app = express();

  app.use(morgan('tiny'));
  app.use(cors());
  app.use(express.static('public'));
  app.use(express.json());
  app.use(bodyParser.json());

  // serve static files from the React app
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  return app;
}

module.exports = createMiddleware;

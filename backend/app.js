const createError = require('http-errors');
const express = require('express');
const path = require('path');

const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');

// Initialize passport
require('./utils/passport');

// Import router
const router = require('./routes/index');

// Initialize app
const app = express();

// Register app settings
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/www')));

// DB Setup
const mongoDB = 'mongodb://admin:actopus2018@ds141813.mlab.com:41813/actopus2018';
mongoose.connect(mongoDB);

// Get the default connection
const db = mongoose.connection;

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

// Register API routers.
app.use('/api', router);
app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/www/index.html`);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;

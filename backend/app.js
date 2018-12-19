const createError = require('http-errors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

// File System
require('./utils/file');

// Passport
require('./utils/passport');

// Set mongoose promises to global promise
mongoose.Promise = global.Promise;

// Create express app
var app = express();

// Configure app
app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// DB Setup
var mongoDB = 'mongodb://admin:actopus2018@ds141813.mlab.com:41813/actopus2018';
mongoose.connect(mongoDB);

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

// Register API router
const api = require('./routes/index');
app.use('/api', api);

// Serve static files
app.use('/static', express.static(path.join(__dirname, '/static')));

// Serve client
app.use(express.static(path.join(__dirname, '/www')));
app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/www/index.html');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;

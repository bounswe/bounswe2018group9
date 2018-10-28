var createError = require('http-errors');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
const passport = require("passport");

// Passport
require("./utils/passport");

// Import routers. 
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var eventsRouter = require('./routes/events');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../frontend/www')));

// DB Setup
var mongoDB = 'mongodb://admin:actopus2018@ds141813.mlab.com:41813/actopus2018';
mongoose.connect(mongoDB);

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

// Register static angular files endpoint.
// app.use('/', indexRouter);

// Register API routers.
app.use('/auth', authRouter);
app.use('/api/events', passport.authenticate('jwt', {session: false}), eventsRouter);

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

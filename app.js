var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
let cors = require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var passport = require('passport');
var db = require('./config/db');
const userRoutes = require('./routes/login');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: false
// }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require('serve-static')(__dirname + '/../../public'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/user', userRoutes);

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
  res.render('error');
});

var allowCrossDomain = function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.set('Access-Control-Allow-Credentials', true);

  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }
};
app.use(allowCrossDomain);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var express 		= require('express');
var path 			= require('path');
var favicon 		= require('serve-favicon');
var logger 			= require('morgan');
var cookieParser 	= require('cookie-parser');
var bodyParser 		= require('body-parser');
var bluebird 		= require('bluebird');
var passport		= require('passport');
var expressSession = require('express-session');

var index 			= require('./routes/index');
var users 			= require('./routes/users');
var portfolios 		= require('./routes/portfolios');
var entries 		= require('./routes/entries');
var comments 		= require('./routes/comments');
var endorsements 	= require('./routes/endorsements');
var events 			= require('./routes/events');
var messages 		= require('./routes/messages');
var auth			= require('./routes/auth');
var db              = require('./config/db');
var app 			= express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({secret: 'mySecretKey', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/portfolios', portfolios);
app.use('/entries', entries);
app.use('/comments', comments);
app.use('/events', events);
app.use('/endorsements', endorsements);
app.use('/messages', messages);
app.use('/auth', auth);
// require('./config/passport')(passport);
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

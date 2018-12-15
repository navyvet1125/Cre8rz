const express 			= require('express')
const path 				= require('path')
const favicon 			= require('serve-favicon')
const logger 			= require('morgan')
const cookieParser 		= require('cookie-parser')
const bodyParser 		= require('body-parser')
const bluebird 			= require('bluebird')
const passport			= require('passport')
const expressSession  	= require('express-session')
const index 			= require('./routes/index')
const users 			= require('./routes/users')
const portfolios 		= require('./routes/portfolios')
const entries 			= require('./routes/entries')
const comments 			= require('./routes/comments')
const endorsements 		= require('./routes/endorsements')
const events 			= require('./routes/events')
const messages 			= require('./routes/messages')
const auth				= require('./routes/auth')
const db              	= require('./config/db')
const app 				= express()
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
require('express-helpers')(app)

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(expressSession({secret: 'mySecretKey', resave: false, saveUninitialized: false}))
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/users', users)
app.use('/portfolios', portfolios)
app.use('/entries', entries)
app.use('/comments', comments)
app.use('/events', events)
app.use('/endorsements', endorsements)
app.use('/messages', messages)
app.use('/auth', auth)
app.use('/', index)
// require('./config/passport')(passport)
// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app;

global.db = require('./db');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const passport = require('passport');
const session = require('express-session');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var newRouter = require('./routes/new');
var apiRouter = require('./routes/api');
var editRouter = require('./routes/edit');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Aqui estou carregando nosso módulo auth.js passando o objeto passport pra ele configurar a estratégia de autenticação
require('./auth')(passport);
// Depois digo para o express-session qual secret ele vai usar para algumas criptografias internas e quanto tempo de vida o cookie vai ter
app.use(session({  
  secret: '123',//configure um segredo seu aqui,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 60 * 1000 }//30min
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', loginRouter);
// app.use('/users', usersRouter);
app.use('/', authenticationMiddleware, indexRouter);
app.use('/new', authenticationMiddleware, newRouter);
app.use('/api', apiRouter);
app.use('/edit', authenticationMiddleware, editRouter);

// Chamaremos essa função authenticationMiddleware toda vez que uma requisição solicitar uma página que não seja as públicas (como login).
function authenticationMiddleware(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login?fail=true');
}

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

module.exports = app;

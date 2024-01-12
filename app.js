require('dotenv').config()

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const indexRouter = require('./routes/index.route');
const authRouter = require('./routes/auth.route')

const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter)

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.json({
    status: err.status || 500,
    message: err.message,
    error: req.app.get('env') === 'development' ? err : null,
  });
});

module.exports = app;

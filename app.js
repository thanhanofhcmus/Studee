const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const formidable = require('express-formidable');
const fs = require('fs');
const app = express();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const courseRouter = require('./routes/course');

const homeworkRouter = require('./routes/homework');

const mysql = require('mysql');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/courses', courseRouter);
app.use('/homeworks', homeworkRouter);

app.post('/homeworks', uploadFile);

function uploadFile(req, res, next) {
  console.log('hello');
  if (req.method === 'POST') {
    // create an incoming form object
    const form = new formidable.IncomingForm();
    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;
    // store all uploads in the /uploads directory
    form.uploadDir = path.basename(path.dirname('/uploads/json_files/'));
    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function (field, file) {
      fs.rename(file.path, path.join(form.uploadDir, file.name), function (err) {
        if (err) throw err;
        // console.log('renamed complete: '+file.name);
        // const filePath = '/homeworks/' + file.name;
      });
    });
    // log any errors that occur
    form.on('error', function (err) {
      console.log('An error has occured: \n' + err);
    });
    // once all the files have been uploaded, send a response to the client
    form.on('end', function () {
      res.send('success');
      res.statusMessage = 'Process cashabck initiated';
      res.statusCode = 200;
      res.redirect('/');
      res.end();
    });
    // parse the incoming request containing the form data
    form.parse(req);
  }
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

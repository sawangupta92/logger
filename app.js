var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var runCommand = require('./routes/modules/run_command');
var routes = require('./routes/index');
var users = require('./routes/users');
var log = require('./routes/log');
var async = require('async');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
// server.listen(80);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/log', log);

io.on('connection', function(socket){
  socket.emit('data', { a: 1 })
  socket.on('send data', function(data){
    command = "tail -f /proc/" + data.data + "/fd/7"
    runCommand(command, socket)
  })
  socket.on('list processes', function(data){
    command = "ps -aux | grep -i " + data.data;
    runCommand(command, socket);
  })
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

server.listen(2000);
// module.exports = app;

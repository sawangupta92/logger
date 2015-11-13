var express = require('express');
// var app = express();
// var server = require('http').Server(app);
// var io = require('socket.io')(server);
// server.listen(80);
var async = require('async');
var runCommand = require('./modules/run_command');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  // async.each([runCommand(req.body.application_to_log, 200)], function(){
    res.render('log/done', { response: req.body.application_to_log });
  // })
});

module.exports = router;

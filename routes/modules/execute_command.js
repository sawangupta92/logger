var rexec = require('remote-exec'),
    fs = require('fs');

function show(socket){
  this.socket = socket;
};
show.prototype.write = function(data){
  log = data.toString('utf8')
  if(!log.includes('delayed_jobs')){
    this.socket.emit('data', {'data': log});
  }
}

function executeCommand(app_id, socket) {
  write = new show(socket);
  var connection_options = {
      port: 22,
      username: 'ubuntu',
      privateKey: require('fs').readFileSync('/Users/sawan/.ssh/id_rsa'),
      passphrase: 'bhagatsingh',
      stdout: write,
      stderr: fs.createWriteStream('./try.txt')
  };
  var hosts = [
      'beta.proofloyalty.com'
  ];
  var cmds = [
      command
  ];
  rexec(hosts, cmds, connection_options, function(err){
  });
}

module.exports = executeCommand;

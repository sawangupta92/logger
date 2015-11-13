var executeCommand = require('./execute_command');
function runCommand(app_id, socket) {
  command = "tail -f /proc/" + app_id + "/fd/7"
  console.log(command)
  executeCommand(command, socket)
};

module.exports = runCommand;

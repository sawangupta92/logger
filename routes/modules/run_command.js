var executeCommand = require('./execute_command');
function runCommand(command, socket) {
  // console.log(command)
  executeCommand(command, socket)
};

module.exports = runCommand;

let Service;
switch (process.platform) {
  case 'win32':
    Service = require('node-windows').Service;
    break;
  case 'darwin':
    Service = require('node-mac').Service;
    break;
  case 'linux':
    Service = require('node-linux').Service;
    break;
  default:
    break;
}

module.exports = Service;

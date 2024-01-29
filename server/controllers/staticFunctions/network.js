const os = require('os')
const networkInterfaces = os.networkInterfaces();

function getIpAddress(){
    for (const interfaceName in networkInterfaces) {
        const iface = networkInterfaces[interfaceName];
        for (const alias of iface) {
          if (alias.family === 'IPv4' && !alias.internal) {
            return alias.address
          }
        }
      }
}

module.exports = {getIpAddress}
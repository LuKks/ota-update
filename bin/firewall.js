const { createCommand } = require('commander')

const firewall = createCommand('firewall')
  .description('Allow or deny devices')

firewall
  .command('allow <device-id>')
  .description('Allow a device')
  .option('--server [url]', 'custom backend')
  .option('--firmware-id <id>', 'firmware id')
  .option('--firmware-key <key>', 'firmware key')
  .option('--secret [token]', 'access token')
  .action(require('../lib/firewall-allow.js'))

firewall
  .command('deny <device-id>')
  .description('Deny a device')
  .option('--server [url]', 'custom backend')
  .option('--firmware-id <id>', 'firmware id')
  .option('--firmware-key <key>', 'firmware key')
  .option('--secret [token]', 'access token')
  .action(require('../lib/firewall-deny.js'))

module.exports = firewall

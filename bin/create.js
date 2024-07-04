const { createCommand } = require('commander')

module.exports = createCommand('create')
  .description('Create a new firmware')
  .option('--server [url]', 'custom backend')
  .option('--secret [token]', 'access token')
  .action(require('../lib/create.js'))

const { createCommand } = require('commander')

module.exports = createCommand('create')
  .description('Create a new firmware')
  .option('--save', 'save .env file with credentials')
  .option('--server [url]', 'custom backend')
  .option('--secret [token]', 'access token')
  .action(require('../lib/create.js'))

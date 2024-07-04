#!/usr/bin/env node

const { program } = require('commander')
const safetyCatch = require('safety-catch')
const dotenv = require('dotenv')
const pkg = require('./package.json')

dotenv.config()

const main = program
  .version(pkg.version)
  .description(pkg.description)
  .addCommand(require('./bin/create.js'))
  .addCommand(require('./bin/firewall.js'))
  .addCommand(require('./bin/compile.js'))
  .addCommand(require('./bin/upload.js'))

main.parseAsync().catch(err => {
  safetyCatch(err)
  console.error('error: ' + err.message)
  process.exit(1)
})

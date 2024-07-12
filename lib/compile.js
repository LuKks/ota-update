const path = require('path')
const compileSketch = require('./compile-sketch.js')

module.exports = async function compile (target, opts = {}) {
  const {
    board = 'esp32da', // ESP32-WROOM-DA
    build = 'build',
    verbose = false
  } = opts

  const fqbn = 'esp32:esp32:' + board

  if (target.endsWith('.ino')) {
    if (verbose) console.log('Compiling:', path.resolve(target))

    const compiled = compileSketch(target, { fqbn, build, verbose })

    if (verbose) console.log('Output:', path.resolve(compiled.out))

    return compiled
  }

  throw new Error('target not supported (only .ino files)')
}

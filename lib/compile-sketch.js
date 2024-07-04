const path = require('path')
const { execFileSync } = require('child_process')
const cli = require('arduino-cli-runtime')

module.exports = function compileSketch (filename, opts = {}) {
  const { fqbn, build, verbose } = opts

  const dirname = path.dirname(path.resolve(filename))

  execFileSync(cli, [
    'compile',
    '--fqbn=' + fqbn,
    '--libraries=' + path.join(dirname, 'libraries'),
    '--build-path=' + build,
    filename
  ], { stdio: verbose ? 'inherit' : 'ignore' })

  const out = path.join(build, path.basename(filename) + '.bin')

  return { out }
}

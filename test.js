const fs = require('fs')
const path = require('path')
const { execFileSync } = require('child_process')
const test = require('brittle')
const tmp = require('like-tmp')
const ota = require('./index.js')

const WIFI_SSID = '<wifi name>'
const WIFI_PASS = '<wifi pass>'

test('basic', async function (t) {
  const firmware = await ota.create()

  await ota.firewall.allow('nodemcu', {
    firmwareId: firmware.id,
    firmwareKey: firmware.key
  })

  // Sketch
  const dir = await tmp(t)

  const target = path.join(dir, path.basename(dir) + '.ino')

  const build = path.join(dir, 'build')
  const out = path.join(build, path.basename(target) + '.bin')

  await fs.promises.writeFile(target, `
    #include <ota.h>
    #include <WiFi.h>

    void
    setup () {
      Serial.begin(115200);

      wifi_begin();

      ota_updates("${firmware.id}");
    }

    void
    loop () {
      delay(999999);
    }

    void
    wifi_begin () {
      WiFi.begin("${WIFI_SSID}", "${WIFI_PASS}");

      while (WiFi.status() != WL_CONNECTED) {
        Serial.println("Connecting");
        delay(500);
      }
    }
  `.trim())

  // Dependencies
  git(['clone', 'git@github.com:lukks/ota.git', path.join(dir, 'libraries', 'ota')])

  await ota.compile(target, { build, verbose: true })

  await ota.upload(out, {
    firmwareId: firmware.id,
    firmwareKey: firmware.key
  })

  await ota.firewall.deny('nodemcu', {
    firmwareId: firmware.id,
    firmwareKey: firmware.key
  })
})

function git (args) {
  const output = execFileSync('git', args, { encoding: 'utf-8' })
  return output.trim()
}

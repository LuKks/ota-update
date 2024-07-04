const fs = require('fs')
const fetch = require('like-fetch')
const FormData = require('form-data')

module.exports = async function upload (target, opts = {}) {
  const {
    server = process.env.OTA_SERVER || 'https://ota.leet.ar',
    firmwareId = process.env.OTA_FIRMWARE_ID || null,
    firmwareKey = process.env.OTA_FIRMWARE_KEY || null
  } = opts

  console.log('Uploading binary:', target)

  const form = new FormData()
  const file = await fs.promises.readFile(target)

  form.append('file', file, {
    filename: 'firmware.bin',
    contentType: 'text/plain'
  })

  let uploaded = null

  try {
    uploaded = await fetch(server + '/v1/upload', {
      method: 'POST',
      headers: {
        'x-ota-firmware-id': firmwareId,
        'x-ota-firmware-key': firmwareKey
      },
      requestType: 'form',
      responseType: 'json',
      validateStatus: 'ok',
      body: form
    })
  } catch (err) {
    if (!err.response) throw err

    throw new Error(`Upload failed (${err.response.status} ${err.body.code})`)
  }

  console.log('Upload successful')
  console.log('Firmware hash', uploaded.hash)
}

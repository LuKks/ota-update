const fs = require('fs')
const fetch = require('like-fetch')

module.exports = async function create (opts = {}) {
  const {
    server = process.env.OTA_SERVER || 'https://ota.leet.ar',
    save = false
  } = opts

  if (save && (await stat('.env'))) {
    throw new Error('file .env already exists')
  }

  let firmware = null

  try {
    firmware = await fetch(server + '/v1/create', {
      method: 'POST',
      requestType: 'json',
      responseType: 'json',
      validateStatus: 'ok'
    })
  } catch (err) {
    if (!err.response) throw err

    throw new Error(`creation failed (${err.response.status} ${err.body.code})`)
  }

  console.log('Firmware id:', firmware.id)
  console.log('Firmware key:', firmware.key)

  if (save) {
    await fs.promises.writeFile('.env', `
OTA_FIRMWARE_ID = "${firmware.id}"
OTA_FIRMWARE_KEY = "${firmware.key}"
    `.trim() + '\n', { flag: 'wx' })
  }

  return firmware
}

async function stat (filename) {
  try {
    return await fs.promises.stat(filename)
  } catch {
    return null
  }
}

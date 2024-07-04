const fetch = require('like-fetch')

module.exports = async function create (opts = {}) {
  const {
    server = process.env.OTA_SERVER || 'https://ota.leet.ar'
  } = opts

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

    throw new Error(`Creation failed (${err.response.status} ${err.body.code})`)
  }

  console.log('Firmware id:', firmware.id)
  console.log('Firmware key:', firmware.key)

  return firmware
}

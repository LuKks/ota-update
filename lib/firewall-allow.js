const fetch = require('like-fetch')

module.exports = async function firewallAllow (deviceId, opts = {}) {
  const {
    server = process.env.OTA_SERVER || 'https://ota.leet.ar',
    firmwareId = process.env.OTA_FIRMWARE_ID || null,
    firmwareKey = process.env.OTA_FIRMWARE_KEY || null
  } = opts

  try {
    await fetch(server + '/v1/firewall/allow', {
      method: 'POST',
      headers: {
        'x-ota-firmware-id': firmwareId,
        'x-ota-firmware-key': firmwareKey
      },
      requestType: 'json',
      responseType: 'json',
      validateStatus: 'ok',
      body: { device_id: deviceId }
    })
  } catch (err) {
    if (!err.response) throw err

    throw new Error(`firewall failed (${err.response.status} ${err.body?.code})`)
  }

  console.log('Device is allowed now')
}

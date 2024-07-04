# ota-update

Upload firmware OTA updates to IoT devices

```
npm i -g ota-update
```

## Usage

```sh
ota-update create
# Firmware id: et45...tkwo81qkrg7dks3qkz4
# Firmware key: fg8g...rgj9raugb63ukjn5k1zeae67itbyja7ehsfwubnhuppup

ota-update firewall allow nodemcu [--firmware-id <id> --firmware-key <key>]
# Device is allowed now

# For .c files use idf.py via iot-container, otherwise for .ino programs:
ota-update compile ./sketch.ino

ota-update upload ./build/sketch.ino.bin [--firmware-id <id> --firmware-key <key>]
# Upload successful
# Firmware hash 5b8a3d138b153184337326cbd7dfe08ef38bdab4
```

## API

CLI

```bash
ota-update <command> [options]

Commands:
  create [options]          Create a new firmware
  firewall                  Allow or deny devices
  compile [options] <file>  Compile a firmware
  upload [options] <file>   Deploy a firmware update
  help [command]            display help for command
```

Module

```js
const ota = require('ota-update')

const firmware = await ota.create()

await ota.firewall.allow('nodemcu', {
  firmwareId: firmware.id,
  firmwareKey: firmware.key
})

await ota.compile('./sketch.ino')

await ota.upload('./build/sketch.ino.bin', {
  firmwareId: firmware.id,
  firmwareKey: firmware.key
})
```

## Settings

You can save in a `.env` file relative to where you run the commands:

```sh
# Custom server in case you self-host the backend
OTA_SERVER = ""

# Configure a firmware to avoid using the CLI or module options
OTA_FIRMWARE_ID = ""
OTA_FIRMWARE_KEY = ""
```

Note: Security will be improved over time.

## License

MIT

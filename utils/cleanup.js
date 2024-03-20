const fs = require('fs/promises')
const { TEMP_PATH, OUTPUT_PATH } = require('./config.js')

const cleanupTemp = async () => {
  const files = await fs.readdir(TEMP_PATH)
  files.forEach((file) => fs.unlink(`${TEMP_PATH}/${file}`))
}

const cleanupOutputs = async (wipeAll = false) => {
  const files = await fs.readdir(`public/${OUTPUT_PATH}`)
  const currentDate = Date.now()
  const timeLimit = 10*60*1000
  files.forEach((file) => {
    fs
      .stat(`public/${OUTPUT_PATH}/${file}`)
      .then((stats) => {
        if((currentDate-Date.parse(stats.mtime) > timeLimit) || wipeAll) fs.unlink(`public/${OUTPUT_PATH}/${file}`)
      }
    )
  })
}

module.exports = {
  cleanupTemp,
  cleanupOutputs
}
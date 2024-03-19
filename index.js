const { PORT, OUTPUT_PATH } = require('./utils/config')
const { cleanupTemp, cleanupOutputs } = require('./utils/cleanup.js')
const app = require('./app.js')

const runCleanups = async () => {
  console.log('Running cleanups...')
  console.log('Cleaning up the temp folder...')
  await cleanupTemp()
  console.log('Done')
  console.log(`Cleaning up public/${OUTPUT_PATH}...`)
  await cleanupOutputs()
  console.log('Done')
  console.log(`Cleanup finished on ${new Date().toUTCString()}`)
}

const startup = async () => {
  await runCleanups()
  const outputCleanupInterval = setInterval(async () => {
    runCleanups()
  }, 10*60*1000)
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

startup()
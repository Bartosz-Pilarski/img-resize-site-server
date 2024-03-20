require('dotenv').config()

const PORT = process.env.PORT
const TEMP_PATH = 'temp'
const OUTPUT_PATH = 'images'
const ACCEPTED_MIMES = [
  'image/webp',
  'image/avif',
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/tiff',
  //SVG is read-only
  'image/svg+xml'
]

module.exports = {
  PORT,
  ACCEPTED_MIMES,
  TEMP_PATH,
  OUTPUT_PATH
}
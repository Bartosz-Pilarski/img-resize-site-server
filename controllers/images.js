const fs = require('fs/promises')

const multer = require("multer")
const sharp = require("sharp")

const { rateLimit } = require("express-rate-limit")
const { toPixelCount, isExtensionSupported } = require("../utils/utils")

const upload = multer({ dest: 'temp' })

const imageRouter = require("express").Router()

const { ACCEPTED_MIMES, TEMP_PATH, OUTPUT_PATH } = require("../utils/config")

const imagePostLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 60,
  message: 'You can only resize 60 images per 10 minutes',
  standardHeaders: true,
  legacyHeaders: false
})

imageRouter.get('/:imageId', async (req, res) => {
  res.status(200).end(req.params.imageId)
})

imageRouter.post("/", imagePostLimiter, upload.single('image'), async (req, res) => {
  const { width, height, extension } = { 
    width: toPixelCount(req.body.width), 
    height: toPixelCount(req.body.height), 
    extension: isExtensionSupported(req.body.extension) 
  }

  if(!(width && height && extension)) return res.status(400).json({ error: 'incorrect parameters' })
  if(!(ACCEPTED_MIMES.includes(req.file.mimetype))) return res.status(400).json({ error: 'incorrect file type' })

  const filepath = `${TEMP_PATH}/${req.file.filename}`
  const outputpath = `${OUTPUT_PATH}/${req.file.filename}_output.${extension}`
  const buffer = await fs.readFile(filepath)

  await sharp(buffer)
    .resize(width, height, { fit: 'fill' })
    .toFile(`public/${outputpath}`)

  fs.unlink(filepath)
  res.status(200).json({ url: outputpath })
})

module.exports = imageRouter
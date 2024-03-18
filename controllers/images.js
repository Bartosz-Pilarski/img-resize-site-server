const fs = require('fs/promises')

const multer = require("multer")
const sharp = require("sharp")

const upload = multer({ dest: 'temp' })

const imageRouter = require("express").Router()

const { toPixelCount, isExtensionSupported } = require("../utils/utils")

imageRouter.get('/:imageId', async (req, res) => {
  res.status(200).end(req.params.imageId)
})

imageRouter.post("/", upload.single('image'), async (req, res) => {
  const { width, height, extension } = { 
    width: toPixelCount(req.body.width), 
    height: toPixelCount(req.body.height), 
    extension: isExtensionSupported(req.body.extension) 
  }

  if(!(width && height && extension)) res.status(400).json({ error: "incorrect parameters"})

  const filepath = `temp/${req.file.filename}`
  const outputpath = `images/${req.file.filename}_output.${extension}`
  const buffer = await fs.readFile(filepath)

  await sharp(buffer)
    .resize(width, height, { fit: 'fill' })
    .toFile(`public/${outputpath}`)

  fs.unlink(filepath)
  res.status(200).json({ url: outputpath })
})

module.exports = imageRouter
const fs = require('fs/promises')

const multer = require("multer")
const sharp = require("sharp")

const upload = multer({ dest: 'temp' })

const imageRouter = require("express").Router()

imageRouter.get('/:imageId', async (req, res) => {
  res.status(200).end(req.params.imageId)
})

imageRouter.post("/", upload.single('image'), async (req, res) => {
  const filepath = `temp/${req.file.filename}`
  const outputpath = `images/${req.file.filename}_output.${req.body.extension}`
  const buffer = await fs.readFile(filepath)

  await sharp(buffer)
    .resize(32, 32)
    .toFile(`public/${outputpath}`)

  fs.unlink(filepath)
  res.status(200).json({ url: outputpath })
})

module.exports = imageRouter
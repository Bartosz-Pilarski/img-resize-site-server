const express = require("express")
const cors = require("cors")

const imageRouter = require("./controllers/images")

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/images', imageRouter)

app.use(express.static('public'))

app.get("*", async (req, res) => {
  res.end('<h1> Treacherous place ye\'ve found yerself in </h1>')
})

module.exports = app
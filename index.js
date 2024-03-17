const config = require("./utils/config")
const app = require("./app.js")

const PORT = config.PORT

app.listen(PORT, () => {
  console.log(`hii on port ${PORT}`)
})
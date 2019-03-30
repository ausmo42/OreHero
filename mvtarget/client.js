
const express = require('express')
const app = express()
const port = 3000

app.use(express.static('mvproject/www'))

app.listen(port, () => console.log(`oreHero client launched on port ${port}!`))
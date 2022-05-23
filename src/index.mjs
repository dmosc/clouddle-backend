import express from 'express'
import cors from 'cors'
import { serverConfig } from './environment.mjs'
import { rooms } from './routes/index.mjs'
import loadDictionary from './scripts/load-dictionary.mjs'

let dictionary;
(async () => {
  dictionary = await loadDictionary()
})()

const app = express()
app.use(cors())
app.use(express.json())
app.use(async function (req, _, next) {
  req.dictionary = dictionary
  next()
})

app.use('/rooms', rooms)

app.listen(serverConfig.port, () => {
  console.log(`Serving ${process.env.npm_package_name} on port ${serverConfig.port}`)
})

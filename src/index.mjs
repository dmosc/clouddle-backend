import express from 'express'
import { Server } from 'socket.io'
import cors from 'cors'
import { appUrl, serverConfig } from './environment.mjs'
import { rooms } from './routes/index.mjs'
import loadDictionary from './scripts/load-dictionary.mjs'
import SessionManager from './classes/session-manager.mjs'

// Shared variables
let dictionary
(async () => {
  dictionary = await loadDictionary()
})()
const sessionManager = new SessionManager()

const app = express()
const wsServer = new Server({
  cors: {
    origin: appUrl
  }
})

// Global variables
app.set('io', wsServer)

// Middlewares
app.use(cors())
app.use(express.json())
app.use(async function (req, res, next) {
  req.dictionary = dictionary
  req.sessionManager = sessionManager
  next()
})

// Routes
app.use('/rooms', rooms)

const httpServer = app.listen(serverConfig.port, function () {
  console.log(`Serving ${process.env.npm_package_name} on port ${serverConfig.port}`)
})
wsServer.listen(httpServer)

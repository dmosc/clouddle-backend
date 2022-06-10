import express from 'express'
import { Server } from 'socket.io'
import cors from 'cors'
import { appUrl, serverConfig } from './environment.mjs'
import { auth, rooms } from './routes/index.mjs'
import loadDictionary from './scripts/load-dictionary.mjs'
import SessionManager from './classes/session-manager.mjs'
import connectDatabase from './database/connect.mjs'
import cookieParser from 'cookie-parser'

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
app.use(cors({
  origin: [appUrl],
  credentials: true,
  exposedHeaders: ['set-cookie']
}))
app.use(express.json())
app.use(cookieParser())
app.use(async function (req, res, next) {
  req.dictionary = dictionary
  req.sessionManager = sessionManager
  next()
})

// Routes
app.use('/auth', auth)
app.use('/rooms', rooms)

const httpServer = app.listen(serverConfig.port, async function () {
  console.log(`Serving ${process.env.npm_package_name} on port ${serverConfig.port}`)
  await connectDatabase()
})
wsServer.listen(httpServer)

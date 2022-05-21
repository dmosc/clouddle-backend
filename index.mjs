import express from 'express'
import cors from 'cors'
import { serverConfig } from './environment.mjs'

const app = express()
app.use(cors())

app.listen(serverConfig.port, () => console.log(`Listening on port ${serverConfig.port}`))

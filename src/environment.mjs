import dotenv from 'dotenv'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

dotenv.config()
const __rootdir = dirname(fileURLToPath(import.meta.url))
const serverConfig = {
  httpPort: process.env.HTTP_PORT,
  wsPort: process.env.WS_PORT
}
const appUrl = process.env.APP_URL

export { __rootdir, serverConfig, appUrl }
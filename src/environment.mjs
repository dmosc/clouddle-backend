import dotenv from 'dotenv'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

dotenv.config()
const __rootdir = dirname(fileURLToPath(import.meta.url))
const serverConfig = {
  port: process.env.PORT
}
const appUrl = process.env.APP_URL
const mongo = {
  url: process.env.MONGO_URI
}
const hashSalt = process.env.HASH_SALT

export { __rootdir, serverConfig, appUrl, mongo, hashSalt }

import dotenv from 'dotenv'

dotenv.config()

const serverConfig = {
  port: process.env.PORT
}

export {
  serverConfig
}

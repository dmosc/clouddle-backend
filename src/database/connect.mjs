import mongoose from 'mongoose'
import { mongo } from '../environment.mjs'

let db, isConnected

const connectDatabase = async () => {
  if (isConnected) return db
  try {
    db = await mongoose.connect(mongo.url)
    isConnected = db.connections[0].readyState
    return db
  } catch (err) {
    throw new Error(err)
  }
}

export default connectDatabase

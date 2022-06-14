import mongoose from 'mongoose'

const SessionModel = new mongoose.Schema({
  winner: { type: String, required: true },
  words: { type: [String], required: true },
  points: { type: {}, required: true }
})

export default mongoose.model('Session', SessionModel)

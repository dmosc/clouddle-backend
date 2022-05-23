import { Router } from 'express'

const rooms = Router()

rooms.get('/', (req, res) => {
  res.status(200).json({})
})

rooms.post('/new', (req, res) => {
  res.status(200).json({})
})

rooms.post('/turn', (req, res) => {
  const { word } = req.body;
  if (req.dictionary.has(word)) {
    return res.status(200).json({ message: `${word} exists!` })
  }
  return res.status(200).json({ message: `${word} doesn't exists!` })
})

export default rooms

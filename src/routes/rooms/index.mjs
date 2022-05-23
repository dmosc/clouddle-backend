import { Router } from 'express'

const rooms = Router()

rooms.get('/', (req, res) => {
  res.status(200).json({})
})

rooms.post('/new', (req, res) => {
  res.status(200).json({})
})

rooms.post('/turn', (req, res) => {

})

export default rooms

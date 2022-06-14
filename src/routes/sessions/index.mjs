import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { hashSalt } from '../../environment.mjs'
import models from '../../database/models/index.mjs'

const session = Router()

session.use(function (req, res, next) {
  const token = req.cookies['cld-token']
  if (!token) {
    return res.status(401).send('Must be signed in to fetch your information.')
  }
  try {
    const { username } = jwt.decode(token, hashSalt)
    req.username = username
  } catch (e) {
    return res.status(500).json(e)
  }
  next()
})

session.get('/', async (req, res) => {
  const sessions = await models.Session.find({ [`points.${req.username}`]: { $exists: true } })
  return res.status(200).json(sessions)
})

export default session

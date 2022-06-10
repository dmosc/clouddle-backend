import { Router } from 'express'
import models from '../../database/models/index.mjs'

const auth = Router()

auth.post('/register', async (req, res) => {
  const { username, password } = req.body
  const user = new models.User({ username, password })
  try {
    await user.save()
    const token = user.generateToken()
    const maxAge = new Date().getMilliseconds() * 10 * 365 * 24 * 60 * 60; // 10 years
    res.cookie('cld-token', token, { maxAge })
    return res.status(200).json({ token })
  } catch (e) {
    return res.status(500).json(e)
  }
})

auth.post('/login', async (req, res) => {
  const { username, password } = req.body
  const user = await models.User.findOne({ username })
  if (!user) {
    return res.status(401).send(`Username ${username} does not exist.`)
  }
  if (!user.isPasswordValid(password)) {
    return res.status(401).send(`Incorrect password for ${username}`)
  }
  const token = user.generateToken()
  res.cookie('cld-token', token)
  return res.status(200).json({ token })
})

auth.post('/logout', async (req, res) => {
  res.clearCookie('cld-token')
  res.end()
})

export default auth

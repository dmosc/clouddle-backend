import { Router } from 'express'
import { randomUUID } from 'crypto'

const rooms = Router()

rooms.get('/', (req, res) => {
  const sessionManager = req?.sessionManager
  res.status(200).json(Object.keys(sessionManager.getSessions()).map((key) => {
    const session = sessionManager.getSession(key)
    return session.printable()
  }))
})

rooms.get('/new', (req, res) => {
  const io = req.app.get('io')
  const sessionManager = req?.sessionManager
  const session = sessionManager.createSession()
  const user = randomUUID()
  session.addUser(user)
  session.setPrefix(req.dictionary.getRandomPrefix(session.getDifficulty()))
  res.setHeader('session', session.getId())
  res.setHeader('user', user)
  io.emit(session.getId(), session.printable())
  return res.status(200).json({ session: session.printable(), user })
})

rooms.get('/join/:sessionId', (req, res) => {
  const io = req.app.get('io')
  const sessionManager = req?.sessionManager
  const session = sessionManager.getSession(req.params.sessionId)
  if (!session) {
    return res.status(404).send(`Session ${req.params?.sessionId} does not exist`)
  }
  const user = randomUUID()
  session.addUser(user)
  io.emit(session.getId(), session.printable())
  return res.status(200).json({ session: session.printable(), user })
})

rooms.use(function (req, res, next) {
  const sessionId = req.header('session')
  if (sessionId) {
    const session = req?.sessionManager.getSession(sessionId)
    if (!session) {
      return res.status(404).send(`Session ${sessionId} does not exist`)
    }
    req.session = session
  }
  next()
})

rooms.post('/start', (req, res) => {
  const io = req.app.get('io')
  const session = req.session
  session.start()
  io.emit(session.getId(), session.printable())
  return res.status(200).json(session.getPoints())
})

rooms.post('/turn', (req, res) => {
  const io = req.app.get('io')
  const user = req.header('user')
  const { word } = req.body
  const session = req.session
  if (session.isGuessValid(word, user) && req.dictionary.has(word)) {
    session.addPoints(word, user)
    if (session.getLapCount() === 2) {
      session.resetLaps()
      session.setPrefix(req.dictionary.getRandomPrefix(session.getDifficulty()))
    }
  }
  io.emit(session.getId(), session.printable())
  return res.status(200).json(session.getPoints())
})

export default rooms

import { randomUUID } from 'crypto'

class Session {
  constructor () {
    this.id = randomUUID()
    this.points = {}
    this.usedWords = new Set()
    this.difficulty = 2
    this.prefix = null
    this.userOrder = []
    this.currentUser = 0
    this.lapCount = 0
    this.isActive = false
    this.winner = undefined
    this.pointsToWin = 55000
    this.defaultTurnDuration = 7000
  }

  getId () {
    return this.id
  }

  getUsedWords () {
    return this.usedWords
  }

  getDifficulty () {
    return this.difficulty
  }

  getPoints () {
    return this.points
  }

  getPrefix () {
    return this.prefix
  }

  getUserOrder () {
    return this.userOrder
  }

  getCurrentUser () {
    return this.getUserOrder()[this.currentUser]
  }

  getLapCount () {
    return this.lapCount
  }

  getPointsToWin () {
    return this.pointsToWin
  }

  isUserTurn (user) {
    return this.getCurrentUser() === user
  }

  isGuessValid (word, user) {
    return this.isUserTurn(user) && word.includes(this.getPrefix()) && !this.getUsedWords().has(word)
  }

  registerWord (word) {
    this.getUsedWords().add(word)
  }

  addUser (user) {
    if (!this.getUserOrder().includes(user)) {
      this.getPoints()[user] = 0
      this.getUserOrder().push(user)
    }
  }

  addPoints (word, user) {
    this.registerWord(word)
    this.getPoints()[user] += word.length * this.getDifficulty() * 1000
    if (this.getPoints()[user] >= this.getPointsToWin()) {
      this.winner = user
      this.stop()
    }
  }

  addLap () {
    ++this.lapCount
  }

  resetLaps () {
    this.lapCount = 0
  }

  setPrefix (prefix) {
    this.prefix = prefix
  }

  nextTurn () {
    const userOrder = this.getUserOrder()
    const prevCurrentUser = this.currentUser
    this.currentUser = (this.currentUser + 1) % userOrder.length
    if (this.currentUser <= prevCurrentUser) {
      this.addLap()
    }
  }

  printable () {
    return {
      ...this,
      usedWords: Array.from(this.getUsedWords())
    }
  }

  modelFormat () {
    return {
      winner: this.winner,
      points: this.getPoints(),
      words: Array.from(this.getUsedWords())
    }
  }

  start () {
    this.isActive = true
  }

  stop () {
    this.isActive = false
  }

  isOver () {
    return !!this.winner
  }
}

export default Session

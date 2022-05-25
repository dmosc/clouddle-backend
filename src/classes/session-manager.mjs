import Session from './session.mjs'

class SessionManager {
  constructor () {
    this.sessions = {}
  }

  getSessions () {
    return this.sessions
  }

  getSession (id) {
    return this.getSessions()[id]
  }

  createSession () {
    const session = new Session()
    this.getSessions()[session.getId()] = session
    return session
  }
}

export default SessionManager

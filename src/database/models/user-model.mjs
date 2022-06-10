import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { hashSalt } from '../../environment.mjs'
import jwt from 'jsonwebtoken'

const UserModel = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

UserModel.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, hashSalt)
  next()
})

UserModel.methods.generateToken = function () {
  return jwt.sign({ id: this._id, username: this.username, password: this.password }, hashSalt, {}, null)
}

UserModel.methods.isPasswordValid = function (password) {
  return bcrypt.compareSync(password, this.password)
}

export default mongoose.model('User', UserModel)

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema
const SALT_WORK_FACTOR = 10

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: props => `${props.value} is not a valid email address!`
    },
  },
  password: {
    type: String,
    required: true
  }
})

UserSchema.pre(['save'], async function (next) {
  if (!this.isModified('password')) return next()

  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
    this.password = await bcrypt.hash(this.password, salt)
    return next()
  } catch (err) {
    return next(err)
  }
})

UserSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', UserSchema)

module.exports = {
  User
}
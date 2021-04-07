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
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: props => `${props.value} is not a valid email address!`
    },
  },
  password: {
    type: String,
    required: true
  },
  photo: {
    type: Buffer,
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

UserSchema.statics.findAndAuthenticate = async function (email, password) {
  const user = await User.findOne({ email: email })
  if (!user) {
    throw new Error("User not found")
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    throw new Error ("Invalid password")
  }

  return user
}

UserSchema.methods.testPassword = async function(password) {
  return bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', UserSchema)

module.exports = {
  User
}
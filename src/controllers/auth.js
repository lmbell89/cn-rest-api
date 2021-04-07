require("dotenv").config()
const jwt = require('jsonwebtoken')

const { User } = require('../models/User')

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findAndAuthenticate(email, password)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1 week" })
    res.send(token)
  } catch (error) {
    console.log(error)
    res.status(400).send(error.message)
  }
}
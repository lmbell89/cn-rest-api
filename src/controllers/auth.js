require("dotenv").config()
const jwt = require('jsonwebtoken')

const { User } = require('../models/User')

exports.login = async (req, res) => {
  try {
    const user = await User.findAndAuthenticate({ email: req.body.email })
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.send(token)
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
}
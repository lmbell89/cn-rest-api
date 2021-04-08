const jwt = require('jsonwebtoken')
const { User } = require('../models/User')

exports.auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "")
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.sub)

    if (!req.user) {
      throw new Error("Account not found")
    }

    next()
  } catch (error) {
    res.status(400).send(error.message)
  }
}
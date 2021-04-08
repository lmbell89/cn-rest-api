const { User } = require('../models/User')

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findAndAuthenticate(email, password)
    res.send(user.generateAuthToken())
  } catch (error) {
    console.log(error)
    res.status(400).send(error.message)
  }
}
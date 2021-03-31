const { User } = require('../models/User')

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({})
    res.send(allUsers)
  } catch (error) {
    res.status(500).send(error)
  }
}

exports.addUser = async (req, res) => {
  try {
    const user = new User(req.body)
    const returnedValue = await user.save()
    res.status(201).send(returnedValue)
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
}

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    for (const [key, value] of Object.entries(req.body)) {
      user[key] = value
    }
    const returnedValue = await user.save()    
    res.send(returnedValue)
  } catch (error) {
    console.log(error)
    res.status(404).send({ message: 'user not found'})
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    res.send(user)
  } catch (error) {
    res.status(404).send({ message: 'user not found'})
  }
}
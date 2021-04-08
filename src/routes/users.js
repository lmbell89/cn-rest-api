const { Router } = require("express")
const { 
  getUserById, 
  addUser, 
  updateUser, 
  deleteUser
} = require("../controllers/users")
const { auth } = require('../middleware')

const userRouter = Router()

userRouter.get('/user/:id', getUserById)
userRouter.post('/user', addUser)
userRouter.patch('/user/:id', auth, updateUser)
userRouter.delete('/user/:id', auth, deleteUser)

module.exports = {
  userRouter
}
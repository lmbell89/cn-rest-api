const { Router } = require("express")
const { 
  getAllUsers, 
  getUserById, 
  addUser, 
  updateUser, 
  deleteUser,
  authenticateUser
} = require("../controllers/users")
const { auth } = require('../middleware')

const userRouter = Router()

userRouter.get('/user', getAllUsers)
userRouter.get('/user/:id', getUserById)
userRouter.post('/user', auth, addUser)
userRouter.patch('/user/:id', auth, updateUser)
userRouter.delete('/user/:id', auth, deleteUser)

module.exports = {
  userRouter
}
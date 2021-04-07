const { Router } = require("express")
const { 
  getAllUsers, 
  getUserById, 
  addUser, 
  updateUser, 
  deleteUser,
  authenticateUser
} = require("../controllers/users")

const userRouter = Router()

userRouter.get('/user', getAllUsers)
userRouter.get('/user/:id', getUserById)
userRouter.post('/user', addUser)
userRouter.patch('/user/:id', updateUser)
userRouter.delete('/user/:id', deleteUser)

module.exports = {
  userRouter
}
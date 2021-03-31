const { Router } = require('express')
const { 
  getAllPosts, 
  getPostsByUser, 
  addPost, 
  updatePost, 
  deletePost 
} = require('../controllers/posts')

const postRouter = Router()

postRouter.get('/posts', getAllPosts)
postRouter.get('/posts/:user_id', getPostsByUser)
postRouter.post('/posts/:user_id', addPost)
postRouter.patch('/posts/:id', updatePost)
postRouter.delete('/posts/:id', deletePost)

module.exports = {
  postRouter
}
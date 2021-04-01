const { Router } = require("express")
const { 
  getPostComments, 
  addComment, 
  updateComment, 
  deleteComment
} = require("../controllers/comments")

const commentRouter = Router()

commentRouter.get('/comment/:id', getPostComments)
commentRouter.post('/comment', addComment)
commentRouter.patch('/comment/:id', updateComment)
commentRouter.delete('/comment/:id', deleteComment)

module.exports = {
  commentRouter
}
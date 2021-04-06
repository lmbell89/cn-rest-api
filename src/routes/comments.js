const { Router } = require("express")
const { 
  addComment, 
  updateComment, 
  deleteComment
} = require("../controllers/comments")

const commentRouter = Router()

commentRouter.post('/comment', addComment)
commentRouter.patch('/comment/:id', updateComment)
commentRouter.delete('/comment/:id', deleteComment)

module.exports = {
  commentRouter
}
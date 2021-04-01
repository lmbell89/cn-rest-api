const { Comment } = require('../models/Comment')

exports.getPostComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.id })
    res.send(comments)
  } catch (error) {
    console.log(error)
    res.status(404).send(error)
  }
}

exports.addComment = async (req, res) => {
  try {
    const comment = new Comment(req.body)
    const returnedValue = await comment.save()
    res.send(returnedValue)
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
}

exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.send(comment)
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
}

exports.deleteComment = async (req, res) => {
  try {
    const post = await Comment.findByIdAndDelete(req.params.id)
    res.send(post)
  } catch (error) {
    console.log(error)
    res.status(404).send(error)
  }
}
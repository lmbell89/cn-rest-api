const { Post } = require('../models/Post')

exports.addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.body.post)
    post.comments.push(req.body)
    const returnedValue = await post.save()
    res.send(returnedValue)
  } catch (error) {
    console.log(error)
    res.status(400).send(error.message)
  }
}

exports.updateComment = async (req, res) => {
  try {
    const post = await Post.findById(req.body.post)
    post.comments.id(req.params.id).content = req.body.content
    await post.save()
    res.send(post.comments.id(req.params.id))
  } catch (error) {
    console.log(error)
    res.status(400).send(error.message)
  }
}

exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.body.post)
    const comment = post.comments.id(req.params.id)
    await comment.remove()
    await post.save()
    res.send(comment)
  } catch (error) {
    console.log(error)
    res.status(404).send(error.message)
  }
}
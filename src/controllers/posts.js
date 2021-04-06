const { Post } = require('../models/Post')

exports.getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find({})
      .skip((req.body.page - 1) * 10)
      .limit(10)
    res.send(allPosts)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}

exports.getPostsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.user_id })
      .skip((req.query.page - 1) * 10)
      .limit(10)
    res.send(posts)
  } catch (error) {
    console.log(error)
    res.status(404).send(error)
  }
}

exports.addPost = async (req, res) => {
  try {
    const post = new Post(req.body)
    post.author = req.params.user_id
    const returnedValue = await post.save()
    res.send(returnedValue)
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
}

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.send(post)
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
}

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id)
    res.send(post)
  } catch (error) {
    console.log(error)
    res.status(404).send(error)
  }
}
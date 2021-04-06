const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CommentScheme = new Schema(
  {
    content: {
      type: String,
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  },
  { timestamps: true }
)

const PostSchema = new Schema(
  {
    content: {
      type: String,
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    comments: [CommentScheme]
  },
  { timestamps: true }
)

const Post = mongoose.model('Post', PostSchema)

module.exports = {
  Post
}
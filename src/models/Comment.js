const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CommentSchema = new Schema(
  {
    content: {
      type: String,
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
  },
  { timestamps: true }
)

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = {
  Comment
}
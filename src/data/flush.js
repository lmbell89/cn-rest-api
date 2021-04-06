require('../db/connection')
const { User } = require('../models/User')
const { Post } = require('../models/Post')

(async () => {
  await User.deleteMany({})
  await Post.deleteMany({})
  console.log("done!")
})()
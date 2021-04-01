require("dotenv").config()
const deepai = require('deepai')

const words = require('./words.json')
const { User } = require('../models/User')
const { Post } = require('../models/Post')

const SEED_LENGTH = 6
const users = await User.find({})

deepai.setApiKey(process.env.DEEPAI_KEY)

const selectRandom = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

const generateText = async (seedText) => {
  const text = await deepai.callStandardApi('text-generator', { text: seedText })
  return text.output.substr(seedText.length, text.length)
}

const makePost = async () => {
  let seedText = ""
  for (let i = 0; i < SEED_LENGTH; i++) {    
    seedText += `${selectRandom(words)} `
  }

  const content = await generateText(seedText)
  const author = selectRandom(users)._id
  const post = new Post({ content, author })
  post.save()
}

const makeComment = async (postContent) => {
  const seedText = postContent.split(" ").slice(0, SEED_LENGTH).join(" ")
  const content = await generateText(seedText)
  const author = selectRandom(users)._id
  const comment = new Comment({ content, author })
  comment.save()
}


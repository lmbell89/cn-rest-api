const faker = require('faker')
const deepai = require('deepai')
const fetch = require('node-fetch')
const sharp = require('sharp')

require("dotenv").config()
require('../db/connection')
const words = require('./words.json')
const { User } = require('../models/User')
const { Post } = require('../models/Post')

const SEED_LENGTH = 6
const COMMENT_THRESHOLD = 0.2
deepai.setApiKey(process.env.DEEPAI_KEY)

const selectRandom = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

const generateText = async (seedText) => {
  const text = await deepai.callStandardApi('text-generator', { text: seedText })
  return text.output.substr(seedText.length, text.length)
}

const makePost = async (users) => {
  let seedText = ""
  for (let i = 0; i < SEED_LENGTH; i++) {    
    seedText += `${selectRandom(words)} `
  }

  const content = await generateText(seedText)
  const author = selectRandom(users)._id
  const comments = []

  let random = Math.random()
  while (random > COMMENT_THRESHOLD) {
    comments.push( await makeComment(users, content) )
    random *= Math.random()
  }

  const post = new Post({ content, author, comments })
  post.save()
}

const makeComment = async (users, postContent) => {
  const seedText = postContent.split(" ").slice(0, SEED_LENGTH).join(" ")
  const content = await generateText(seedText)
  const author = selectRandom(users)._id
  return { content, author }
}

const makeUser = async () => {
  const photoSize = { width: 128, height: 128 }

  const name = faker.name.findName()
  const email = faker.internet.email()
  const password = faker.internet.password()

  const buffer = await fetch('https://thispersondoesnotexist.com/image')
    .then(response => response.buffer())
  const photo = await sharp(buffer).resize(photoSize).toBuffer()

  const user = new User({ name, email, password, photo })
  await user.save()
}

const populateDb = async () => {
  const USER_COUNT = 20
  const POST_COUNT = 20

  for (let i = 0; i < USER_COUNT; i++) {
    await makeUser()
  }

  const users = await User.find({})

  for (let i = 0; i < POST_COUNT; i++) {
    await makePost(users)
  }
  console.log("done!")
}

populateDb()
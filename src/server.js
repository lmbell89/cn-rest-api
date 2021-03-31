const express = require('express')

require('./db/connection')
const { User } = require('./models/User.js')
const { Post } = require('./models/Post')

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/health', function (req, res) {
  res.send({message: 'API working'})
})

app.get('/user', async (req, res) => {
  try {
    const allUsers = await User.find({})
    res.send(allUsers)
  } catch (error) {
    res.status(500).send(error)
  }
})

app.post('/user', async (req, res) => {
  try {
    const user = new User(req.body)
    const returnedValue = await user.save()
    res.status(201).send(returnedValue)
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
})

app.patch('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    for (const [key, value] of Object.entries(req.body)) {
      user[key] = value
    }
    console.log(req.body)
    const newUser = await user.save()    
    console.log(newUser)
    res.send(newUser)
  } catch (error) {
    console.log(error)
    res.status(404).send({ message: 'user not found'})
  }
})

app.delete('/user/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    res.send(user)
  } catch (error) {
    res.status(404).send({ message: 'user not found'})
  }
})


app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find({})
    res.send(posts)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.get('/posts/:user_id', async (req, res) => {
  try {
    const posts = await Post.find({ author: requestAnimationFrame.params.user_id })
    res.send(posts)
  } catch (error) {
    console.log(error)
    res.status(404).send(error)
  }
})

app.post('/posts/:user_id', async (req, res) => {
  try {
    const post = new Post(req.body)
    post.author = req.params.user_id
    const returnedValue = await post.save()
    res.send(returnedValue)
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
})
 
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
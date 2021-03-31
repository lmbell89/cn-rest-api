import express from 'express'

require('./db/connection')
import { User } from './models/User'

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
    res.status(400).send(error)
  }
})

app.patch('/user/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new : true })
    console.group(user)
    res.send(user)
  } catch (error) {
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
 
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
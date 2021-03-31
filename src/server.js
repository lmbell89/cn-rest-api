require('./db/connection')
const express = require('express')

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/health', function (req, res) {
  res.send({message: 'API working'})
})

app.get('/user', async function (req, res) {
  try {
    const allUsers = await User.find({})
    res.send(allUsers)
  } catch (error) {
    res.status(500).send(error)
  }
})

app.post('/user', async function (req, res) {
  try {
    const user = new User(req.body)
    const returnedValue = await user.save()
    res.status(201).send(returnedValue)
  } catch (error) {
    res.status(400).send(error)
  }
})
 
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
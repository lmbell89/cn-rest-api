require('./db/connection')
const express = require('express')
const app = express()

app.use(express.json())

const port = process.env.PORT || 5000

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
    res.send(error)
  }
})

app.post('/user', async function (req, res) {
  try {
    const allUsers = await User.find({})
    res.send(allUsers)
  } catch (error) {
    res.send(error)
  }
})
 
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
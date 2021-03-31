const express = require('express')

require('./db/connection')
const { userRouter } = require('./routes/users')
const { postRouter } = require('./routes/posts')

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(userRouter)
app.use(postRouter)

app.get('/health', function (req, res) {
  res.send({message: 'API working'})
})
 
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
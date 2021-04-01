const express = require('express')
const cors = require('cors')

require('./db/connection')
const { userRouter } = require('./routes/users')
const { postRouter } = require('./routes/posts')
const { commentRouter } = require('./routes/comments')

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(postRouter)
app.use(commentRouter)

app.get('/health', function (req, res) {
  res.send({message: 'API working'})
})
 
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
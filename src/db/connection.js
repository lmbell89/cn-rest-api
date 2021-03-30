require("dotenv").config()
const mongoose = require('mongoose')

const connection = async() => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log("Database connected")
  } catch (error) {
    console.log(error)
  }
}

connection()
require("dotenv").config()
import mongoose from 'mongoose'

const connection = async() => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING)
    console.log("success")
  } catch (error) {
    console.log(error)
  }
}

connection()
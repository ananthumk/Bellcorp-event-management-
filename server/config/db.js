const mongoose = require("mongoose")

const db = async () => {
  try {
    console.log("Connecting to:", process.env.db_url)
    await mongoose.connect(process.env.db_url)
    console.log("mongodb server connected")
  } catch (err) {
    console.log("Mongo Error:", err.message)
    process.exit(1)
  }
}

module.exports = db

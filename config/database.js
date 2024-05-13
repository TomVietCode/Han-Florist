const mongoose = require("mongoose")

module.exports.connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Connect Succeeded!")
  } catch (error) {
    console.log("Connect Failed!")
  }
}
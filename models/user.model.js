const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  tokenUser: String,
  phone: String,
  avatar: String,
},
{
  timestamps: true,
})

const User = mongoose.model("User", userSchema, "users")

module.exports = User
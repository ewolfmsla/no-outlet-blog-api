const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: { unique: true },
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    // Assigns createdAt and updatedAt fields with a Date type
    timestamps: true,
  },
)

const User = mongoose.model('User', UserSchema)
module.exports = User

// Require the mongose library
const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
})

// Define the Comments's database schema
const commentSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    index: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    hide: {
      type: Boolean,
      required: true,
      default: false,
    },
    post: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Post',
    },
    user: userSchema,
  },
  {
    // Assigns createdAt and updatedAt fields with a Date type
    timestamps: true,
  },
)

// Define the 'Post' model with the schema
const Comment = model('Comment', commentSchema)
// Export the module
module.exports = Comment

// Require the mongose library

const { Schema, model } = require('mongoose');

// Define the Post's database schema
const postSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'Comment',
      },
    ],
  },
  {
    // Assigns createdAt and updatedAt fields with a Date type
    timestamps: true,
  }
);

// Define the 'Post' model with the schema
const Post = model('Post', postSchema);
// Export the module
module.exports = Post;

const mongoose = require('mongoose');
const { signIn, signUp } = require('../auth/index');
const { deletePost, newPost, updatePost } = require('./context/posts');
const { hideComment, newComment } = require('./context/comments');

// mongoose.set('debug', true);

module.exports = {
  signUp: async (_, { email, username, password }) =>
    signUp({ email, username, password }),
  signIn: async (_, { email, password }) => signIn({ email, password }),
  newPost: async (_, { title, text }) => newPost({ title, text }),
  deletePost: async (_, { id }) => deletePost(id),
  updatePost: async (_, { id, title, text }, { user }) =>
    updatePost({ id, title, text, user }),
  newComment: async (_, { postId, index, text }, { user }) =>
    newComment({ user, postId, index, text }),
  hideComment: async (_, { id, hide }, { user }) =>
    hideComment({ user, id, hide }),
};

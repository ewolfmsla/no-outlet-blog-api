// const { models } = require('mongoose')

module.exports = {
  posts: async (parent, args, { models }) =>
    models.Post.find().populate('comments'),
  post: async (parent, args, { models }) =>
    models.Post.findById(args.id).populate('comments'),
  comments: async (parent, args, { models }) =>
    models.Comment.find({ post: args.post }),
  comment: async (parent, args, { models }) => models.Comment.findById(args.id),
};

const { Types } = require('mongoose');
const { ForbiddenError } = require('apollo-server-errors');
const { Comment, Post } = require('../../models/index');

const newPost = async ({ title, text }) =>
  Post.create({
    _id: new Types.ObjectId(),
    title,
    text,
  });

const updatePost = async ({ id, title, text, user }) => {
  if (!user?.isAdmin) throw new ForbiddenError('Unauthorized user');
  try {
    return await Post.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          title,
          text,
        },
      },
      {
        new: true,
      }
    );
  } catch (err) {
    throw new Error('Error updating post');
  }
};

const deletePost = async (id) => {
  try {
    await Comment.deleteMany({ post: id });
    await Post.findOneAndRemove({ _id: id });
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = {
  newPost,
  deletePost,
  updatePost,
};

const { AuthenticationError } = require('apollo-server-errors');
const { Types } = require('mongoose');
const AuthError = require('../../auth/errors');
const { Comment, Post } = require('../../models/index');

const newComment = async ({ user, postId, index, text }) => {
  try {
    const post = await Post.findById(postId);

    const comment = new Comment({
      _id: new Types.ObjectId(),
      post: post._id,
      index,
      text,
      user: {
        id: user?.id,
        username: user?.username,
      },
    });

    post.comments = [...post.comments, comment];
    await post.save();

    return await comment.save();
  } catch (err) {
    throw new Error('Error creating comment!');
  }
};

const hideComment = async ({ user, id, hide }) => {
  if (!user)
    throw new AuthError('You must be logged in to hide/unhide comment', 401);

  try {
    let comment = await Comment.findById(id);
    if (comment && user.id === String(comment.user.id)) {
      comment.hide = hide;
      comment.save();
      return comment;
    } else {
      throw new Error('Only the comment author may hide/unhide the comment');
    }
  } catch (err) {
    throw new AuthError(err.message, 401);
  }
};

module.exports = { hideComment, newComment };

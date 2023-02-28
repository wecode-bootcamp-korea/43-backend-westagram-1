const postDao = require("../models/postDao");

const createPost = async (title, content, userId, postsImg) => {
  const newPost = await userDao.newPost(title, content, userId, postsImg);
  return newPost;
};

const changeModifyPost = async (postingId, postingTitle, postingContent) => {
  const modifyPost = await postDao.modifyPost(
    postingId,
    postingTitle,
    postingContent
  );
  return modifyPost;
};

const changeDeletePost = async (postId) => {
  const deletePost = await postDao.deletePost(postId);
  return deletePost;
};

module.exports = {
  createPost,
  changeModifyPost,
  changeDeletePost,
};

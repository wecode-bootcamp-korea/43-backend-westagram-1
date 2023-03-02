const postDao = require("../models/postDao");

const createPost = async (title, content, userId, postsImg) => {
  const newPost = await postDao.newPost(title, content, userId, postsImg);
  return newPost;
};

const modifyPost = async (postingId, postingTitle, postingContent) => {
  const modifyPost = await postDao.modifyPost(
    postingId,
    postingTitle,
    postingContent
  );
  return modifyPost;
};

const deletePost = async (postId) => {
  const deletePost = await postDao.deletePost(postId);
  return deletePost;
};

module.exports = {
  createPost,
  modifyPost,
  deletePost,
};

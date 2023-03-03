const likeDao = require("../models/likeDao");

const createLike = async (userId, postId) => {
  const pressLike = await likeDao.pressLike(userId, postId);
  return pressLike;
};

module.exports = {
  createLike,
};

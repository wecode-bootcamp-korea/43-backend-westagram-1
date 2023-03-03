const userDao = require("../models/userDao");

const signUp = async (name, email, password, profileImage) => {
  const createUser = await userDao.createUser(
    name,
    email,
    password,
    profileImage
  );
  return createUser;
};

const userPosts = async (userId) => {
  const showUserPosts = await userDao.showUserPosts(userId);
  return showUserPosts;
};

module.exports = {
  signUp,
};

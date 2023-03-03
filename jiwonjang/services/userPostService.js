const userPostDao = require("../models/userPostDao");

const usersPosts = async () => {
  const showUsersPosts = await userPostDao.showUsersPosts();
  return showUsersPosts;
};

module.exports = {
  usersPosts,
};

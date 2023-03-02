const userPostService = require("../services/userPostService");

const usersPosts = async (req, res) => {
  try {
    const userPosts = await userPostService.usersPosts();
    return res.status(200).json({
      data: userPosts,
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  usersPosts,
};

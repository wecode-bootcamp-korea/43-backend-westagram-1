const { appDataSource } = require("./appDataSource");

const showUsersPosts = async () => {
  try {
    return await appDataSource.query(
      `SELECT
        users.id AS userId,
        users.profile_image AS userProfileImage,
        posts.id AS postingId,
        posts.posts_img AS postingImageUrl,
        posts.content AS postingContent
      FROM users
      RIGHT JOIN posts ON users.id = posts.user_id
      `
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  showUsersPosts,
};

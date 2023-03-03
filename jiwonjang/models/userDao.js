const { appDataSource } = require("./appDataSource");

const createUser = async (name, email, password, profileImage) => {
  try {
    return await appDataSource.query(
      `INSERT INTO users(
        name,
        email,
        password,
        profile_image
      )VALUES(?, ?, ?, ?);
      `,
      [name, email, password, profileImage]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const showUserPosts = async (userId) => {
  try {
    return await appDataSource.query(
      `SELECT
          users.id AS userId,
          users.profile_image AS userProfileImage,
          JSON_ARRAYAGG(
            JSON_OBJECT(
              "postingId", posts.id,
              "postingImageUrl", posts.posts_img,
              "postingContent", posts.content
            )
          )AS postings
        FROM users
        JOIN posts ON users.id = posts.user_id
        WHERE users.id = ?
        GROUP BY users.id
      `,
      [userId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createUser,
  showUserPosts,
};

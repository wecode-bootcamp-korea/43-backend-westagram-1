const { appDataSource } = require("./appDataSource");

const newPost = async (title, content, userId, postsImg) => {
  try {
    return await appDataSource.query(
      `INSERT INTO posts(
        title,
        content,
        user_id,
        posts_img
      )VALUES(?, ?, ?, ?);
      `,
      [title, content, userId, postsImg]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const modifyPost = async (postingId, postingTitle, postingContent) => {
  try {
    await appDataSource.query(
      `UPDATE posts
        SET
        title = ?,
        content = ?
      WHERE id = ?
      `,
      [postingTitle, postingContent, postingId]
    );
    const result = await appDataSource.query(
      `SELECT
          users.id as userId,
          users.name as userName,
          posts.id as postingId,
          posts.title as postingTitle,
          posts.content as postingContent
        FROM posts
        INNER JOIN users ON users.id = posts.user_id
        WHERE posts.id = ?
      `,
      [postingId]
    );
    return result;
    //return result.status(200).json({ data: result });
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const deletePost = async (postId) => {
  try {
    await appDataSource.query(
      `DELETE
        FROM posts
        WHERE id = ?
      `,
      [postId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  newPost,
  modifyPost,
  deletePost,
};

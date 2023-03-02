/*require("dotenv").config();

const express = require("express");
const cors = require("cors");

const morgan = require("morgan");

const { DataSource } = require("typeorm");

const appDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

appDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const PORT = process.env.PORT;
const HOST = process.env.HOST;
//
app.get("/ping", (req, res) => {
  return res.status(200).json({ message: "pong" });
});
//completed(tested)
app.post("/users/signup", async (req, res) => {
  const { name, email, profileImage, password } = req.body;

  await appDataSource.query(
    `INSERT INTO users(
      name,
      email,
      profile_image,
      password
    ) VALUES (?, ?, ?, ?);
    `,
    [name, email, profileImage, password]
  );
  res.status(201).json({ message: "userCreated" });
});
//completed(tested)
app.post("/posts", async (req, res) => {
  const { title, content, userId, postsImg } = req.body;

  await appDataSource.query(
    `INSERT INTO posts(
      title,
      content,
      user_id,
      posts_img
    ) VALUES (?, ?, ?, ?);
    `,
    [title, content, userId, postsImg]
  );
  res.status(201).json({ message: "postCreated" });
});
//completed(tested)
app.patch("/posts", async (req, res) => {
  const { postingId, postingTitle, postingContent } = req.body;

  await appDataSource.query(
    `UPDATE posts
      SET
      title = ?,
      content = ?
    WHERE id = ?
    `,
    [postingTitle, postingContent, postingId]
  );
  const result /**여기 대괄호 붙으면 배열이 제거됨 */ /*=
    await appDataSource.query(
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
  return res.status(200).json({ data: result });
});
//completed(tested)
app.delete("/posts/:postId", async (req, res) => {
  const { postId } = req.params;

  await appDataSource.query(
    `
      DELETE
      FROM posts
      Where id = ?
    `,
    [postId]
  );
  res.status(200).json({ message: "postingDeleted" });
});
//complete(tested)
app.get("/users-posts", async (req, res) => {
  await appDataSource.manager.query(
    `SELECT
        users.id AS userId,
        users.profile_image AS userProfileImage,
        posts.id AS postingId,
        posts.posts_img AS postingImageUrl,
        posts.content AS postingContent
      FROM users
      RIGHT JOIN posts ON users.id = posts.user_id`,
    (err, rows) => {
      res.status(200).json({ data: rows });
    }
  );
});
//completed(no test)
app.get("/users/:userId/posts", async (req, res) => {
  const { userId } = req.params;

  const result = await appDataSource.query(
    `SELECT
        users.id AS userID,
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
  return res.status(200).json({ data: result });
});
//
app.post("/:userId/:postId/likes", async (req, res) => {
  const { userId, postId } = req.params;
  try {
    await appDataSource.query(
      `INSERT INTO likes(
        user_id ,
        post_id 
      ) VALUES(?, ?);`,
      [userId, postId]
    );
    res.status(201).json({ message: "likeCreated" });
  } catch (err) {
    return res.status(500).json({ message: "You already liked" });
  }
});

const start = async () => {
  try {
    app.listen(PORT, HOST, () =>
      console.log(`🧨server is listening on ${PORT}🧨`)
    );
  } catch (err) {
    console.error(err);
  }
};

start();
*/
require("dotenv").config();
const routes = require("./routes");

const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(routes);

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

const PORT = process.env.PORT;

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

start();

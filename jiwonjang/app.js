require("dotenv").config();

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

app.get("/ping", (req, res) => {
  return res.status(200).json({ message: "pong" });
});

app.post("/users", async (req, res) => {
  const { name, email, profile_image, password } = req.body;

  await appDataSource.query(
    `INSERT INTO users(
      name,
      email,
      profile_image,
      password
    ) VALUES (?, ?, ?, ?);
    `,
    [name, email, profile_image, password]
  );
  res.status(201).json({ message: "userCreated" });
});

app.post("/posts", async (req, res) => {
  const { title, content, user_id, posts_img } = req.body;

  await appDataSource.query(
    `INSERT INTO posts(
      title,
      content,
      user_id,
      posts_img
    ) VALUES (?, ?, ?, ?);
    `,
    [title, content, user_id, posts_img]
  );
  res.status(201).json({ message: "postCreated" });
});

const start = async () => {
  try {
    app.listen(PORT, HOST, () => console.log(`server is listening on ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

start();

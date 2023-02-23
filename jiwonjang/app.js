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

//health check
app.get("/ping", (req, res) => {
  return res.status(200).json({ message: "pong" });
});

//[users]
//create users
app.post("/users", async (req, res) => {
  const { name, email, profile_image, password } = req.body;

  //console.log(req)

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

//[posts]
//create posts
app.post("/posts", async (req, res) => {
  const { title, content, user_id } = req.body;

  //console.log(req)

  await appDataSource.query(
    `INSERT INTO posts(
      title,
      content,
      user_id
    ) VALUES (?, ?, ?);
    `,
    [title, content, user_id]
  );
  res.status(201).json({ message: "postCreated" });
});

//get users-posts
app.get("/users-posts", async (req, res) => {
  await appDataSoutce.manager.query(
    `SELECT
        users.id,
        users.profile_image,
        posts
      FROM users `,
    (err, rows) => {
      res.status(200).json(rows);
    }
  );
});

const HOST = process.env.HOST;
const start = async () => {
  try {
    app.listen(PORT, HOST, () => console.log(`server is listening on ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

start();

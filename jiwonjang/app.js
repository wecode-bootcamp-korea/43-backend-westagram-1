const dotenv = require("dotenv");
dotenv.config();
const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { DataSource } = require("typeorm");

const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

myDataSource.initialize().then(() => {
  console.log("Data Source has been initialized!");
});

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const server = http.createServer(app);
const PORT = process.env.PORT;

//health check
app.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

//create users

app.post("/users", async (req, res) => {
  const { name, email, profileImage, password } = req.body;

  //console.log(req)

  await myDataSource.query(
    `INSERT INTO users(
      name,
      email,
      profile_image,
      password
    ) VALUES (?, ?, ?, ?);
    `,
    [name, email, profileImage, password]
  );
  res.status(201).json({ message: "useCreated" });
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
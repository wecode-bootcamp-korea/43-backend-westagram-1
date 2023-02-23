const dotenv = require("dotenv");
dotenv.config();

const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { DataSource } = require("typeorm");

const myDataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
    myDataSource.destroy();
  });

app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// health check
app.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

start();

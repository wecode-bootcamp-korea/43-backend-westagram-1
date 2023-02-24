require("dotenv").config();

const express = require ("express");
const cors = require ("cors");
const morgan = require ("morgan");

const { DataSource } = require('typeorm')

const appDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

appDataSource.initialize()
 .then(() => {
    console.log("Data Source has been initialized!")
 })
 .catch((err) => {
    console.error("Error duing Data Source initialization:", err)
 })

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// health check
app.get("/ping", (req, res) => {
    res.status(200).json({ message : "pong"});
})

const PORT = process.env.PORT;

const start = async () => {
    app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
}

start()
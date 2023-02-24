require("dotenv").config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const {DataSource} = require('typeorm');

const appDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
});

appDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    });

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

app.get('/ping', function (req, res, next) {
    return res.status(200).json({message: 'pong!'})
});
app.post('/users', async (req, res) => {
    const {id, name, email, profileImage, password} = req.body
    const users = await appDataSource.query(
        `INSERT INTO users(id,
                           name,
                           email,
                           profile_image,
                           password)
         VALUES (?, ?, ?, ?, ?);
        `, [id, name, email, profileImage, password]);
    res.status(201).json({message: "userCreateed", users}
    );
});

const PORT = process.env.PORT;

const startServer = () => {
    app.listen(PORT, function () {
        console.log(`Server listening on PORT ${PORT}`)
    });
};

startServer();


const express = require('express')
const logger = require('morgan');
const cors = require('cors')
const app = express()
const dotenv = require("dotenv")
const { DataSource } = require('typeorm');

dotenv.config()

app.use(cors())
app.use(logger('combined'));

app.get('/ping', function (req, res, next) {
    res.json({message: 'pong'})
})

const myDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

myDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })

app.listen(8005, function () {
    console.log('server listening on port 8005')
})


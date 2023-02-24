require("dotenv").config();

const express = require('express')
const cors = require('cors')
const morgan = require('morgan');
const app = express()
const { DataSource } = require('typeorm');


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
        console.error("Error during Data Source initialization:", err)
    })

app.use(cors())
app.use(morgan('combined'));

app.get('/ping', function (req, res, next) {
    return res.status(200).json({message: 'pong'})
})

const PORT = process.env.PORT

const startServer=()=>{
    app.listen(PORT, function(){
        console.log(`Server listening on PORT ${PORT}`)
    })
}

startServer();


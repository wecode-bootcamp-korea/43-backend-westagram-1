const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const app = express()
require("dotenv").config();

const PORT = process.env.PORT
app.use(cors())
app.use(logger('dev'));
 
app.get('/pong', function (req, res, next) {
  res.json({message: 'pong'})
})
 
app.listen(PORT, function () {
  console.log(`server listening on port ${PORT}`)
})

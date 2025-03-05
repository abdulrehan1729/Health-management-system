const express = require('express')
const bodyParser = require('body-parser')
const { PORT } = require('./config/env.config')
const connectDB = require('./config/mongo.config')

const app = express()
connectDB()

app.use(bodyParser.json())

app.listen(PORT, () => {
    console.log('server is running on port: ' + PORT)
})
const express = require('express')
const bodyParser = require('body-parser')
const { PORT } = require('./config/env.config')
const connectDB = require('./config/db.config')
const { errorHandler } = require('./middleware/errorHandler')
const cors = require('cors')
const helmet = require('helmet')
const Router = require('./routes/router')

const app = express()
connectDB()

app.use(bodyParser.json())
app.use(cors())
app.use(helmet())

app.use('/api/v1', Router)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log('server is running on port: ' + PORT)
})
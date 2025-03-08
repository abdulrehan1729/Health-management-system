const express = require('express')
const bodyParser = require('body-parser')
const { PORT, SENDER_EMAIL, SMTP_PASS } = require('./config/env.config')
const connectDB = require('./config/db.config')
const { errorHandler } = require('./middleware/errorHandler')
const cors = require('cors')
const helmet = require('helmet')
const Router = require('./routes/router')
const sendEmail = require('./utils/sendEmail')

const app = express()
connectDB()

app.use(bodyParser.json())
app.use(cors())
app.use(helmet())

app.use('/api/v1', Router)
app.get('/send-test-email', async (req, res, next) => {
    try {
        const email = await sendEmail('rey23681@gmail.com', 'test', "test")
        console.log(email)
        res.send('test email sent')
    } catch (error) {
        console.log(error)

    }
})

app.use(errorHandler)


app.listen(PORT, () => {
    console.log('server is running on port: ' + PORT)
})
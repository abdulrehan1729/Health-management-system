const authRouter = require('./auth.routes')

const Router = require('express').Router()

Router.use('/auth', authRouter)

module.exports = Router
const authRouter = require('./auth.routes')
const medRoutes = require('./medication.routes')

const Router = require('express').Router()

Router.use('/auth', authRouter)
Router.use('/medication', medRoutes)

module.exports = Router
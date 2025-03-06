const { register, login, logout, logoutFromAllDevices, logoutFromAllOtherDevices, getLoggedInUserDetails } = require('../controller/auth.controller')
const { authenticate } = require('../middleware/auth.middleware')

const authRouter = require('express').Router()

authRouter.post('/register', register)
authRouter.post('/login', login)

authRouter.use(authenticate)
authRouter.post('/logout', logout)
authRouter.post('/logout-all', logoutFromAllDevices)
authRouter.post('/logout-others', logoutFromAllOtherDevices)
authRouter.get('profile', getLoggedInUserDetails)

module.exports = authRouter
const { register, login, logout, logoutFromAllDevices, logoutFromAllOtherDevices, getLoggedInUserDetails } = require('../controller/auth.controller')
const { authenticate } = require('../middleware/auth.middleware')
const { validateRegister, validatelogin } = require('../middleware/validation.middleware')

const authRouter = require('express').Router()

authRouter.post('/register', validateRegister, register)
authRouter.post('/login', validatelogin, login)

authRouter.use(authenticate)
authRouter.post('/logout', logout)
authRouter.post('/logout-all', logoutFromAllDevices)
authRouter.post('/logout-others', logoutFromAllOtherDevices)
authRouter.get('/profile', getLoggedInUserDetails)

module.exports = authRouter
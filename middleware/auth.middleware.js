const jwt = require('jsonwebtoken')
const logger = require('../utils/logger');
const { CustomError } = require('./errorHandler');
const { JWT_SECRET } = require('../config/env.config');
const User = require('../model/User');

const authenticate = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1];
        if (!token) throw new CustomError('Unauthorized', 401)

        const decoded = jwt.verify(token, JWT_SECRET)
        const user = await User.findById(decoded.userId)

        if (!user || !user.sessions.some(session => session.token === token)) {
            throw new CustomError('Session expired or invalid', 401)
        }

        req.user = user
        req.token = token
        next()

    } catch (error) {
        logger.error(error)
        next(error)
    }

}
module.exports = { authenticate }
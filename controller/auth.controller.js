const jwt = require('jsonwebtoken')
const User = require("../model/User");
const logger = require('../utils/logger');
const { CustomError } = require('../middleware/errorHandler');
const bcrypt = require('bcryptjs');
const { SALT_PW, JWT_SECRET } = require('../config/env.config');


const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        let user = await User.find({ email })
        if (user) {
            throw new CustomError('User already exists', 400)
        }
        user = new User({ name, email, password })
        await user.save()

        res.status(201).json({ message: "User registered successfully", data: user })

    } catch (error) {
        logger.error(error)
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.find({ email })

        if (!user || !(await bcrypt.compare(password, parseInt(SALT_PW)))) throw new CustomError('Invalid Credentials', 401);


        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' })

        user.sessions.push({ token })
        await user.save()


    } catch (error) {
        logger.error(error)
        next(error)
    }
}

const logout = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
        user.sessions = user.sessions.filter(session = session.token !== req.token)
        await user.save()

        return res.status(204).json({ message: 'Logged out successfully ' })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

const logoutFromAllDevices = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
        user.sessions = []
        await user.save()

        return res.status(204).json({ message: 'Logged out successfully from all devices ' })

    } catch (error) {
        logger.error(error)
        next(error)
    }
}

const logoutFromAllOtherDevices = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
        user.sessions = user.sessions.filter(session = session.token === req.token)
        await user.save()

        return res.status(204).json({ message: 'Logged out from other devices successfully ' })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

const getLoggedInUserDetails = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select('-password -sessions')
        res.satatus(200).json({ message: "User details fetched successfully", data: user })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}


module.exports = {
    register,
    login,
    logout,
    logoutFromAllDevices,
    logoutFromAllOtherDevices,
    getLoggedInUserDetails
}
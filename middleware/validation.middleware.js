const Joi = require('joi')
const { CustomError } = require('./errorHandler')

const validateRegister = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    })
    const { error } = schema.validate(req.body, { abortEarly: false })
    if (error) {
        return res.status(400).json({ errors: error.details.map(err => err.message) });
    }
    next()
}
const validatelogin = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    })
    const { error } = schema.validate(req.body, { abortEarly: false })
    if (error) {
        return res.status(400).json({ errors: error.details.map(err => err.message) });
    }
    next()
}

const validateMedId = (req, res, next) => {
    const schema = Joi.object({
        id: Joi.string().hex().length(24).required()
    })

    const { error } = schema.validate(req.params, { abortEarly: false })
    if (error) {
        return res.status(400).json({ errors: error.details.map(err => err.message) });
    }
    next()
}

const validateMedication = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().optional(),
        type: Joi.string().valid('One-Time', 'Recurring').required(),
        time: Joi.string().optional(),
        date: Joi.date().when('type', { is: 'One-Time', then: Joi.date().required(), otherwise: Joi.forbidden() }),
        frequency: Joi.string().valid('Daily', 'Weekly').when('type', { is: 'Recurring', then: Joi.required(), otherwise: Joi.forbidden() }),
        dayOfWeek: Joi.array()
            .items(Joi.string().valid('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'))
            .when('frequency', { is: 'Weekly', then: Joi.required(), otherwise: Joi.forbidden() }),
        startDate: Joi.date().when('type', { is: 'Recurring', then: Joi.required(), otherwise: Joi.forbidden() }),
        endDate: Joi.date().when('type', { is: 'Recurring', then: Joi.optional(), otherwise: Joi.forbidden() })
    });
    const { error } = schema.validate(req.body, { abortEarly: false })
    if (error) {
        return res.status(400).json({ errors: error.details.map(err => err.message) });
    }
    next()
}

module.exports = {
    validateMedId,
    validateMedication,
    validateRegister,
    validatelogin
}
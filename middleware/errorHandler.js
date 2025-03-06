const logger = require("../utils/logger");

class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode
        Error.captureStackTrace(this, this.constructor)
    }
}

const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500
    let message = err.message || "Internal Server Error";

    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors).map((val) => val.message).join(', ')
    } else if (err.name === "MongoServerError" && err.code === 11000) {
        statusCode = 400;
        message = "Duplicate key error";
    } else if (err.name === "CastError") {
        statusCode = 400;
        message = `Invalid ${err.path}: ${err.value}`;
    }

    logger.error(`[${req.method}] ${req.originalUrl} - ${message}`);

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
}

module.exports = { CustomError, errorHandler };


const winston = require('winston')
const path = require('path')


const logFilePath = path.join(__dirname, '../logs/app.log')
const errorLogPath = path.join(__dirname, '../logs/error.log')

const logFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level.toUpperCase()}]: ${message}`
    })
);

const logger = winston.createLogger({
    level: 'info',
    format: logFormat,
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: logFilePath }),
        new winston.transports.File({ filename: errorLogPath, level: 'error' })
    ]
})

module.exports = logger
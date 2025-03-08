const cron = require('node-cron')
const { createQueue } = require('../../config/queueConnection')
const logger = require('../../utils/logger')

const reportQueue = createQueue('weeklyReportQueue')

const generateWeeklyReports = async () => {
    logger.info('Adding report generation job to queue')

    await reportQueue.add('generateReport', { timestamp: new Date() })
}

//Run every Monday 1AM
cron.schedule("19 15 * * *", generateWeeklyReports, { timezone: "Asia/Kolkata" })
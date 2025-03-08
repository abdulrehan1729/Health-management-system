const { createWorker } = require("../../config/queueConnection");
const Medication = require("../../model/Medication");
const User = require("../../model/User");
const { generateCSV } = require("../../utils/csvGenerator");
const logger = require("../../utils/logger");
const sendEmail = require("../../utils/sendEmail");
const moment = require("moment-timezone");
const connectDB = require("../../config/db.config");
const Report = require("../../model/Report");

connectDB();

const worker = createWorker("weeklyReportQueue", async (job) => {
    try {
        logger.info(`🔄 [Job ${job.id}] Starting weekly report generation`);

        // Get all users
        const users = await User.find();
        logger.info(`📌 Found ${users.length} users to process`);

        const oneWeekAgo = moment().subtract(7, "days").startOf("day").toDate();

        for (let user of users) {
            try {
                logger.info(`👤 Processing user: ${user.email}`);

                // Fetch medications for the past 7 days
                const medications = await Medication.find({
                    userId: user._id,
                    startDate: { $gte: oneWeekAgo }
                });

                if (medications.length === 0) {
                    logger.info(`⚠️ No medications found for ${user.email}, skipping...`);
                    continue;
                }

                // Generate CSV
                const csvUrl = await generateCSV(medications, user.email);

                const newReport = new Report({
                    userId: user._id,
                    reportFileUrl: csvUrl
                })
                await newReport.save();
                logger.info(`📊 Report saved to DB for user: ${user.email}`);

                logger.info(`📩 Sending weekly report to ${user.email}`);

                const subject = "Your Weekly Medication Report";
                const text = `Find your report here: ${csvUrl}`;

                await sendEmail(user.email, subject, text);
                logger.info(`✅ Report sent successfully to ${user.email}`);
            } catch (error) {
                logger.error(`❌ Error processing user ${user.email}:`, error);
            }
        }

        logger.info(`✅ [Job ${job.id}] Weekly reports sent.`);
    } catch (error) {
        logger.error(`🚨 [Job ${job.id}] Worker encountered an error:`, error);
    }
});

// Attach event listeners for better debugging
worker.on("completed", (job) => {
    logger.info(`🎉 Job ${job.id} completed successfully`);
});

worker.on("failed", (job, err) => {
    logger.error(`❌ Job ${job.id} failed:`, err);
});

logger.info(`🚀 Worker started for queue: weeklyReportQueue`);

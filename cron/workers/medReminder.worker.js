const { createWorker } = require("../../config/queueConnection");
const logger = require("../../utils/logger");
const sendEmail = require("../../utils/sendEmail");

createWorker('medicationReminderQueue', async (job) => {

    logger.info(`Worker processing job:`, job.data); // Log full job data

    const { email, medicine } = job.data;
    const subject = "Medication Reminder";
    const text = `Take your medicine: ${medicine.name} at ${medicine.time} IST.`;

    logger.info(`Sending email to ${email} for medicine: ${medicine.name}`);

    try {
        await sendEmail(email, subject, text);
        logger.info(`Email sent successfully to ${email}`);
    } catch (error) {
        logger.error(`Error sending email to ${email}:`, error);
    }
})
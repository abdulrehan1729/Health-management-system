const cron = require('node-cron')
const moment = require('moment-timezone')
const Medication = require('../../model/Medication')
const User = require('../../model/User')
const { createQueue } = require('../../config/queueConnection')
const logger = require('../../utils/logger')
const connectDB = require('../../config/db.config')
connectDB()

const reminderQueue = createQueue('medicationReminderQueue')
const sendMedicationReminder = async () => {
    try {
        const currentTimeIST = moment().tz("Asia/Kolkata").format("HH:mm");
        const currentDateIST = moment().tz("Asia/Kolkata").format("YYYY-MM-DD");

        logger.info(`Checking Reminders for ${currentDateIST} at ${currentTimeIST} IST`);

        const medications = await Medication.find({
            time: currentTimeIST,
            isCompleted: false,
            $or: [
                { type: "One-Time", date: currentDateIST },
                { type: "Recurring" }
            ]
        });

        if (medications.length === 0) {
            console.log("No medications to send reminders for.");
            return;
        }

        for (let med of medications) {
            const user = await User.findById(med.userId);
            if (!user) continue;

            logger.info(`Sending reminder to ${user.email} for medicine: ${med.name}`);
            logger.info(`Queueing job for ${user.email} - Medicine: ${med.name}`);


            await reminderQueue.add("sendReminder", { email: user.email, medicine: med });
            logger.info(`Job added successfully for ${user.email}`);
        }
    } catch (error) {
        logger.error("Error in sendMedicationReminder:", error);
    }
};

cron.schedule("* * * * *", sendMedicationReminder, { timezone: "Asia/Kolkata" })
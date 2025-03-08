const nodmailer = require('nodemailer')
const { SENDER_EMAIL, SMTP_PASS } = require('../config/env.config')

const transporter = nodmailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: SENDER_EMAIL,
        pass: SMTP_PASS
    }
})

transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
    }
});

const sendEmail = async (email, subject, text) => {
    const emailSend = await transporter.sendMail({
        from: SENDER_EMAIL,
        to: email,
        subject,
        text
    })

    return emailSend
}

module.exports = sendEmail
const cloudinary = require('cloudinary').v2
const { format } = require('fast-csv')
const { PassThrough } = require('stream');
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = require('../config/env.config');
const { resolve } = require('path');
const logger = require('./logger');

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});

const generateCSV = async (medications, email) => {
    return new Promise((resolve, reject) => {
        const passThrough = new PassThrough();
        const fileNmae = `weekly_reports/${email}_reports_${Date.now()}.csv`

        const csvStream = format({ headers: true })
        csvStream.pipe(passThrough);

        medications.forEach((med) => {
            csvStream.write({
                "Medicine Name": med.name,
                "Description": med.description,
                "Time": med.time,
                "Date": med.date ? med.date.toISOString().split("T")[0] : null,
                "Type": med.type,
                "Mark as Done": med.isCompleted ? "YES" : "NO"
            })
        })
        csvStream.end()

        //upload to cloudinary
        cloudinary.uploader.upload_stream(
            { resource_type: "raw", public_id: fileNmae, format: "csv" },
            (err, result) => {
                if (err) {
                    logger.error('Error uploading CSV', err)
                    return reject(err)
                }
                logger.info(`CSV uploaded: ${result.secure_url}`)
                resolve(result.secure_url)
            }).end(passThrough.read())

    })
}

module.exports = { generateCSV }
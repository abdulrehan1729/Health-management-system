const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    reportDate: {
        type: Date,
        default: Date.now, // Automatically sets the report generation date
    },
    reportFileUrl: {
        type: String, // URL for the stored CSV/PDF file (if uploaded to Cloudinary)
    },
});

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;

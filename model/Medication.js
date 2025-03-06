const mongoose = require("mongoose");
const { frequencyEnum, typeEnum, daysEnum } = require("../utils/constants");

const medicationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    description: { type: String },
    type: { type: String, enum: typeEnum, required: true },
    time: { type: String },
    date: { type: Date },
    frequency: { type: String, enum: frequencyEnum, default: null },
    dayOfWeek: { type: String, enum: daysEnum, default: null },
    startDate: { type: Date },
    endDate: { type: Date },
    isCompleted: { type: Boolean, default: false }
})

module.exports = mongoose.model('Medication', medicationSchema)
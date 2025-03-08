const { CustomError } = require("../middleware/errorHandler");
const Medication = require("../model/Medication");
const logger = require("../utils/logger");

const addMedication = async (req, res, next) => {
    try {
        const { name, description, type, time, date, frequency, dayOfWeek, startDate, endDate } = req.body
        const userId = req.user._id

        let medication = new Medication({ userId, name, description, type, time, date, frequency, dayOfWeek, startDate, endDate })
        await medication.save()

        res.status(201).json({ message: "Medication added successfully", data: medication })

    } catch (error) {
        logger.error(error)
        next(error)
    }
}

const getMedications = async (req, res, next) => {
    try {
        const userId = req.user._id
        const medications = await Medication.find({ userId })
        res.status(201).json({ message: "Medications fetched successfully", data: medications })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

const markAsDone = async (req, res, next) => {
    try {
        const { id } = req.params
        const medication = await Medication.findById(id)
        if (!medication) throw new CustomError('Medication not found', 404)

        medication.isCompleted = true
        await medication.save()
        res.status(201).json({ message: "Medication marked as completed", data: medication })

    } catch (error) {
        logger.error(error)
        next(error)
    }
}

const deletMedication = async (req, res, next) => {
    try {
        const { id } = req.params
        await Medication.findByIdAndDelete(id)
        res.status(200).json({ message: 'Successfully deleted medication' })

    } catch (error) {
        logger.error(error)
        next(error)
    }
}

module.exports = {
    addMedication,
    getMedications,
    markAsDone,
    deletMedication,
}
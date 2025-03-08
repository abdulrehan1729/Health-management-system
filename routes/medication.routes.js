const { getMedications, addMedication, markAsDone, deletMedication } = require('../controller/medication.controller')
const { authenticate } = require('../middleware/auth.middleware')
const { validateMedication, validateMedId } = require('../middleware/validation.middleware')

const medRoutes = require('express').Router()

medRoutes.use(authenticate)
medRoutes.get('/', getMedications)
medRoutes.post('/', validateMedication, addMedication)
medRoutes.put('/mark-done/:id', validateMedId, markAsDone)
medRoutes.delete('/:id', validateMedId, deletMedication)

module.exports = medRoutes
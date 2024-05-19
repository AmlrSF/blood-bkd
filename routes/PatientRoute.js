const express = require('express');
const router = express.Router();
const {
    createPatient,
    getAllPatients,
    getPatientById,
    updatePatientById,
    deletePatientById,
  
} = require('../controllers/PatientCrud');

router.route('/')
    .post(createPatient)
    .get(getAllPatients);

router.route('/:id')
    .get(getPatientById)
    .put(updatePatientById)
    .delete(deletePatientById);



module.exports = router;

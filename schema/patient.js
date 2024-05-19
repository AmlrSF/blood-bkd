const mongoose = require('mongoose');

// Define the patient schema
const patientSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  sex: {
    type: String,
    required: true,
    enum: ['Male', 'Female']
  }
});

// Create the Patient model
const Patient = mongoose.model('Patient', patientSchema);


module.exports = Patient;

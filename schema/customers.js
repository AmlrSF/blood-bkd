const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true },
  profileImage: String,
  phoneNumber: String,
  bio: String,
  passwordHash: String,
  role: {
    type: Number,
    default: 0
  },
  status:{
    type: Boolean,
    default: false
  },
  registrationDate: { type: Date, default: Date.now() },
  country: String,
  userType: {
    type: String,
    enum: ['admission', 'blood bank', 'supplier']
  }
});

const Customer = mongoose.model('User', userSchema);

module.exports = Customer;

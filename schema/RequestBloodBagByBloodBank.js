const mongoose = require('mongoose');

const requestBloodBagByBloodBankSchema = new mongoose.Schema({
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    bloodType: {
        type: String,
        required: true
    },
    productType: {
        type: String,
        required: true
    },
    requestAt: { type: Date, default: Date.now() },
    quantityOfBags: {
        type: Number,
        required: true
    }
});

const RequestBloodBagByBloodBank = mongoose.model('RequestBloodBagByBloodBank', requestBloodBagByBloodBankSchema);

module.exports = RequestBloodBagByBloodBank;

const mongoose = require('mongoose');
const { Schema } = mongoose;

const BloodBagSchema = new Schema({
    product: {
        type: String,
        enum: ['Concentré de globules rouges (PR-001)', 'Concentré standard de plaquettes (PR-002)', 'Concentré plaquettaire d\'aphérèse (PR-003)', 'Plasma Frais Congelé (PR-004)', 'Plasma dépourvu (PR-005)', 'Cryoprécipité (PR-007)'],
        required: true
    },
    type: {
        type: String,
        required: true
    },
  
    expireDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Available', 'Reserved', 'Transfused'],
        default: 'Available'
    }
});

const BloodBag = mongoose.model('BloodBag', BloodBagSchema);

module.exports = BloodBag;

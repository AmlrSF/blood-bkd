const mongoose = require('mongoose');
const { Schema } = mongoose;

// Object for products
const Product = {
    OCGR: 'Concentré de globules rouges (PR-001)',
    OCSP: 'Concentré standard de plaquettes (PR-002)',
    OCPA: 'Concentré plaquettaire d\'aphérèse (PR-003)',
    OPFC: 'Plasma Frais Congelé (PR-004)',
    OPdc: 'Plasma dépourvu (PR-005)',
    Cryoprecipite: 'Cryoprécipité (PR-007)'
};

// Object for qualifications
const Qualifications = {
    PHENOTYPE: 'Phénotype(Q-001)',
    LEUCOCYTE: 'Deuleucyté(Q-002)',
    IRRADIATED: 'Irradié(Q-003)',
    DEPLASMATIZED: 'Deplasmatisé(Q-004)',
    FRACTIONATED: 'Fractionné(Q-005)',
    COMPATIBILIZED: 'Compatibilisé(Q-006)'
};

const BloodRequestByAdmissionSchema = new Schema({
    admissionNumber: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    passionNumber:{type:String, required:true},
    bloodType: { type: String, required: true },
    rhesus: { type: String, required: true },
    selectedPhenotypes: { type: String, required: true },
    emergencyDegree: { type: Boolean, required: true },
    product: { type: String, enum: Object.values(Product), required: true },
    qualifications: [{ type: String, enum: Object.values(Qualifications), required: true }],
    quantity: { type: Number, required: true },
    requestedDate: { type: Date, default: Date.now },
    status: { type: Boolean, default: false } 
});

const BloodRequestByAdmission = mongoose.model('BloodRequestByAdmission', BloodRequestByAdmissionSchema);

module.exports = BloodRequestByAdmission;

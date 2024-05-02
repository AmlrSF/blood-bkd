const BloodBag = require('../schema/BloodBag');

// Create a new blood bag
const createBloodBag = async (req, res) => {
    try {
        const newBloodBag = await BloodBag.create(req.body);
        res.status(201).json({ success: true, data: newBloodBag });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Retrieve all blood bags
const getAllBloodBags = async (req, res) => {
    try {
        const bloodBags = await BloodBag.find();
        res.status(200).json({ success: true, data: bloodBags });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Retrieve a single blood bag by ID
const getBloodBagById = async (req, res) => {
    try {
        const bloodBag = await BloodBag.findById(req.params.id);
        if (!bloodBag) {
            return res.status(404).json({ success: false, message: 'Blood bag not found' });
        }
        res.status(200).json({ success: true, data: bloodBag });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update a blood bag by ID
const updateBloodBagById = async (req, res) => {
    try {
        const bloodBag = await BloodBag.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!bloodBag) {
            return res.status(404).json({ success: false, message: 'Blood bag not found' });
        }
        res.status(200).json({ success: true, data: bloodBag });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Delete a blood bag by ID
const deleteBloodBagById = async (req, res) => {
    try {
        const bloodBag = await BloodBag.findByIdAndDelete(req.params.id);
        if (!bloodBag) {
            return res.status(404).json({ success: false, message: 'Blood bag not found' });
        }
        res.status(200).json({ success: true, message: 'Blood bag deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


module.exports = {
    createBloodBag,
    getAllBloodBags,
    deleteBloodBagById,
    getBloodBagById,
    updateBloodBagById
}
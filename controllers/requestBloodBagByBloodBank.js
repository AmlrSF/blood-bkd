const RequestBloodBagByBloodBank = require('../schema/RequestBloodBagByBloodBank');

// Controller to create a new request for blood bags
exports.createRequestBloodBag = async (req, res) => {
    try {
        const requestBloodBag = new RequestBloodBagByBloodBank(req.body);
        const savedRequestBloodBag = await requestBloodBag.save();
        res.status(201).json(savedRequestBloodBag);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to get all blood bag requests
exports.getAllRequestBloodBags = async (req, res) => {
    try {
        const requestBloodBags = await RequestBloodBagByBloodBank.find()
        .populate("requester", "firstName lastName profileImage")
        res.status(200).json(requestBloodBags);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to get a specific blood bag request by ID
exports.getRequestBloodBagById = async (req, res) => {
    try {
        const requestId = req.params.id;
        const requestBloodBag = await RequestBloodBagByBloodBank.findById(requestId);
        if (!requestBloodBag) {
            return res.status(404).json({ message: 'Request for blood bag not found' });
        }
        res.status(200).json(requestBloodBag);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to update a blood bag request by ID
exports.updateRequestBloodBagById = async (req, res) => {
    try {
        const requestId = req.params.id;
        const updatedRequestBloodBag = await RequestBloodBagByBloodBank.findByIdAndUpdate(
            requestId,
            req.body,
            { new: true }
        );
        if (!updatedRequestBloodBag) {
            return res.status(404).json({ message: 'Request for blood bag not found' });
        }
        res.status(200).json(updatedRequestBloodBag);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to delete a blood bag request by ID
exports.deleteRequestBloodBagById = async (req, res) => {
    try {
        const requestId = req.params.id;
        const deletedRequestBloodBag = await RequestBloodBagByBloodBank.findByIdAndDelete(requestId);
        if (!deletedRequestBloodBag) {
            return res.status(404).json({ message: 'Request for blood bag not found' });
        }
        res.status(200).json({ message: 'Request for blood bag deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

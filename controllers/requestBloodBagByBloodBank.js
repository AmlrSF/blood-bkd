const RequestBloodBagByBloodBank = require('../schema/RequestBloodBagByBloodBank');

// Controller to create a new request for blood bags
const createRequestBloodBag = async (req, res) => {
    try {
        const requestBloodBag = new RequestBloodBagByBloodBank(req.body);
        const savedRequestBloodBag = await requestBloodBag.save();
        res.status(201).json(savedRequestBloodBag);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to get all blood bag requests
const getAllRequestBloodBags = async (req, res) => {
    try {
        console.log("hha")
        const requestBloodBags = await RequestBloodBagByBloodBank.find({})
        .populate("requester", "firstName lastName profileImage userType");
        console.log(requestBloodBags)
        res.status(200).json({success:true, requestBloodBags});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to get a specific blood bag request by ID
const getRequestBloodBagById = async (req, res) => {
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
const updateRequestBloodBagById = async (req, res) => {
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
const deleteRequestBloodBagById = async (req, res) => {
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


module.exports = {
    createRequestBloodBag,
    getAllRequestBloodBags,
    deleteRequestBloodBagById,
    updateRequestBloodBagById,
    getRequestBloodBagById
}
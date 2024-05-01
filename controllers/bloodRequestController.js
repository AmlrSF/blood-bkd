const BloodRequestByAdmission = require('../schema/bloodRequestbyAddmission');

const createBloodRequest = async (req, res) => {
  try {
    const bloodRequest = new BloodRequestByAdmission(req.body);
    await bloodRequest.save();
    res.status(201).json(bloodRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllBloodRequests = async (req, res) => {
  try {
    const bloodRequests = await BloodRequestByAdmission.find();
    res.status(200).json({success:true, requestData:bloodRequests});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBloodRequestById = async (req, res) => {
  try {
    const bloodRequest = await BloodRequestByAdmission.findById(req.params.id);
    if (!bloodRequest) {
      return res.status(404).json({ error: 'Blood request not found' });
    }
    res.status(200).json(bloodRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBloodRequestById = async (req, res) => {
  try {
    const bloodRequest = await BloodRequestByAdmission.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bloodRequest) {
      return res.status(404).json({ error: 'Blood request not found' });
    }
    res.status(200).json(bloodRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBloodRequestById = async (req, res) => {
  try {
    const bloodRequest = await BloodRequestByAdmission.findByIdAndDelete(req.params.id);
    if (!bloodRequest) {
      return res.status(404).json({ error: 'Blood request not found' });
    }
    res.status(200).json({ message: 'Blood request deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBloodRequest,
  getAllBloodRequests,
  getBloodRequestById,
  updateBloodRequestById,
  deleteBloodRequestById
};

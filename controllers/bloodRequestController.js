const BloodRequestByAdmission = require('../schema/bloodRequestbyAddmission');
const BloodBag = require('../schema/BloodBag');

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
    const bloodRequests = await BloodRequestByAdmission.find()
    .populate("admissionNumber", "firstName lastName profileImage")
    .populate('reservedBloodBags');
    res.status(200).json({ success: true, requestData: bloodRequests });
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
    res.status(200).json({success:true,bloodRequest});
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

const activateBloodRequest = async (req, res) => {
  const requestId = req.params.id;

  try {
      // Get the blood request by ID
      const bloodRequest = await BloodRequestByAdmission.findById(requestId);

      if (!bloodRequest) {
          return res.status(200).json({ success: false, message: 'Blood request not found' });
      }
      
      console.log(bloodRequest,bloodRequest.bloodType+bloodRequest.rhesus)
      // Find available blood b,ags matching the request's type and product
      const availableBags = await BloodBag.find({
          type: bloodRequest.bloodType+bloodRequest.rhesus,
          product: bloodRequest.product,
          status: 'Available'
      });

      console.log(availableBags)
      console.log("--------------------------")
      

      // Check if there are enough available bags to fulfill the request
      if (availableBags.length < bloodRequest.quantity) {
          return res.status(200).json({ success: false, message: 'Insufficient blood bags available' });
      }

      // Limit the number of bags to the requested quantity
      const selectedBags = availableBags.slice(0, bloodRequest.quantity);
      bloodRequest.reservedBloodBags = selectedBags;

      // Reserve the matched blood bags and update their status
      await BloodBag.updateMany(
          { _id: { $in: selectedBags.map(bag => bag._id) } },
          { status: 'Reserved' }
      );

      

      bloodRequest.status = true;

      // Save the updated blood request
      await bloodRequest.save();

      res.status(200).json({ success: true, message: 'Blood request activated successfully', updatedBags });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createBloodRequest,
  getAllBloodRequests,
  getBloodRequestById,
  updateBloodRequestById,
  deleteBloodRequestById,
  activateBloodRequest
};

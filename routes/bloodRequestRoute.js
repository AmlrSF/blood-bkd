const express = require('express');
const router = express.Router();
const {
    createBloodRequest,
    getAllBloodRequests,
    getBloodRequestById,
    updateBloodRequestById,
    deleteBloodRequestById,
    activateBloodRequest
} = require('../controllers/bloodRequestController');

router.route('/')
  .post(createBloodRequest)
  .get(getAllBloodRequests);

router.route('/:id')
  .get(getBloodRequestById)
  .put(updateBloodRequestById)
  .delete(deleteBloodRequestById);

router.route('/:id/Activaterequest')
    .put(activateBloodRequest)


module.exports = router;

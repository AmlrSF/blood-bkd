const express = require('express');
const router = express.Router();
const {
    createBloodRequest,
    getAllBloodRequests,
    getBloodRequestById,
    updateBloodRequestById,
    deleteBloodRequestById,
    activateBloodRequest,
    transfuse
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

router.route('/:id/transfuse')
    .delete(transfuse)


module.exports = router;

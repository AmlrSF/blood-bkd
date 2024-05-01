const express = require('express');
const router = express.Router();
const {
    createBloodRequest,
    getAllBloodRequests,
    getBloodRequestById,
    updateBloodRequestById,
    deleteBloodRequestById
} = require('../controllers/bloodRequestController');

router.route('/')
  .post(createBloodRequest)
  .get(getAllBloodRequests);

router.route('/:id')
  .get(getBloodRequestById)
  .put(updateBloodRequestById)
  .delete(deleteBloodRequestById);

module.exports = router;

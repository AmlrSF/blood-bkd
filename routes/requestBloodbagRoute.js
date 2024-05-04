const express = require('express');
const router = express.Router();
const {
    createRequestBloodBag,
    getAllRequestBloodBags,
    getRequestBloodBagById,
    updateRequestBloodBagById,
    deleteRequestBloodBagById,
} = require('../controllers/requestBloodBagByBloodBank');

router.route('/')
    .post(createRequestBloodBag)
    .get(getAllRequestBloodBags);

router.route('/:id')
    .get(getRequestBloodBagById)
    .put(updateRequestBloodBagById)
    .delete(deleteRequestBloodBagById);

module.exports = router;

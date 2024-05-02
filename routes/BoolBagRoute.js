const express = require('express');
const router = express.Router();
const {
    createBloodBag,
    getAllBloodBags,
    getBloodBagById,
    updateBloodBagById,
    deleteBloodBagById,
  
} = require('../controllers/bloodBagCrud');

router.route('/')
    .post(createBloodBag)
    .get(getAllBloodBags);

router.route('/:id')
    .get(getBloodBagById)
    .put(updateBloodBagById)
    .delete(deleteBloodBagById);



module.exports = router;

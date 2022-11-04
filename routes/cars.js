
const express = require('express');
const router = express.Router();

const {getAll} =require('../controllers/cars');
router.get('/carlist', getAll);

module.exports = router;
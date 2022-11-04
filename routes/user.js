const express = require('express');
const router = express.Router();

const {getProfile, updateProfile} =require('../controllers/user');
router.get('/getprofile', getProfile);
router.put('/updateprofile', updateProfile)

module.exports = router;
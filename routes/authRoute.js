const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

// auth route
router.post('/sign-in', authController.sign_in);

module.exports = router;
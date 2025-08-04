const express = require('express');
const router = express.Router();

const otpController = require('../controllers/otpController');
const messageController = require('../controllers/messageController');
const financeController = require('../controllers/financeController');


// OTP routes
router.post('/send-otp', otpController.sendOtp);
router.post('/check-otp', otpController.verifyOtp);

// Message form submission
router.post('/submit-form', messageController.submitMessage);

// submit form
router.post('/submit-finance-form', financeController.submitForm);

module.exports = router;

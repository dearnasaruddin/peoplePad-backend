const express = require('express')
const registrationController = require('../controller/auth/registrationController')
const verifyController = require('../controller/auth/verifyController')
const router = express.Router()

router.post('/registration', registrationController)
router.post('/verify/:token', verifyController)

module.exports = router
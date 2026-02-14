const express = require('express')
const { registrationController } = require('../controller/authController')
const router = express.Router()

router.post('/registration', registrationController)

module.exports = router
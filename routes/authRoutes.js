const express = require('express')
const registrationController = require('../controller/auth/registrationController')
const verifyController = require('../controller/auth/verifyController')
const loginController = require('../controller/auth/loginController')
const refreshController = require('../controller/auth/refreshController')
const forgotPassController = require('../controller/auth/forgotPassController')
const resetPassController = require('../controller/auth/resetPassController')
const router = express.Router()

router.post('/registration', registrationController)
router.get('/verify/:token', verifyController)
router.post('/login', loginController)
router.post('/refresh', refreshController)
router.post('/forgot-password', forgotPassController)
router.post('/reset-password/:token', resetPassController)

module.exports = router
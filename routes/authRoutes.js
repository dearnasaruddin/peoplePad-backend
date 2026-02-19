const express = require('express')
const registrationController = require('../controller/auth/registrationController')
const verifyController = require('../controller/auth/verifyController')
const loginController = require('../controller/auth/loginController')
const refreshController = require('../controller/auth/refreshController')
const router = express.Router()

router.post('/registration', registrationController)
router.post('/verify/:token', verifyController)
router.post('/login', loginController)
router.post('/refresh', refreshController)

module.exports = router
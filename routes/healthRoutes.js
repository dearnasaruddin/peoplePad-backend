const express = require('express')
const router = express.Router()
const healthCheckController = require('../controller/healthCheckController')

router.get('/health', healthCheckController)

module.exports = router
const express = require('express')
const editProfileController = require('../controller/user/editProfileController')

const authMiddleware = require('../middlewares/authMiddleware')
const upload = require('../middlewares/multerMiddleware')
const router = express.Router()

router.put('/edit-profile', authMiddleware, upload.single('avatar'), editProfileController)


module.exports = router
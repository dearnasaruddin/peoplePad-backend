const express = require('express')
const editProfileController = require('../controller/user/editProfileController')
const getProfileController = require('../controller/user/getProfileController')

const authMiddleware = require('../middlewares/authMiddleware')
const upload = require('../middlewares/multerMiddleware')
const router = express.Router()

router.put('/edit-profile', authMiddleware, upload.single('avatar'), editProfileController)
router.get('/user/me', authMiddleware, getProfileController)


module.exports = router
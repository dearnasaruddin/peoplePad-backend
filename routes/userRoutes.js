const express = require('express')
const editProfileController = require('../controller/user/editProfileController')
const getProfileController = require('../controller/user/getProfileController')

const authMiddleware = require('../middlewares/authMiddleware')
const upload = require('../middlewares/multerMiddleware')
const deleteProfileController = require('../controller/user/deleteProfileController')
const router = express.Router()

router.put('/edit-profile', authMiddleware, upload.single('avatar'), editProfileController)
router.get('/user/me', authMiddleware, getProfileController)
router.delete('/delete-profile', authMiddleware, deleteProfileController)


module.exports = router
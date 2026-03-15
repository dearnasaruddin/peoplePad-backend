const express = require('express')
const createContactController = require('../controller/contact/createContactController')
const authMiddleware = require('../middlewares/authMiddleware')
const getContactController = require('../controller/contact/getContactController')
const updateContactController = require('../controller/contact/updateContactController')
const deleteContactController = require('../controller/contact/deleteContactController')
const upload = require('../middlewares/multerMiddleware')
const router = express.Router()

router.post('/create-contact', authMiddleware, upload.single('avatar'), createContactController)
router.get('/get-contacts', authMiddleware, getContactController)
router.put('/update-contact/:id', authMiddleware, upload.single('avatar'), updateContactController)
router.delete('/delete-contact/:id', authMiddleware, deleteContactController)

module.exports = router
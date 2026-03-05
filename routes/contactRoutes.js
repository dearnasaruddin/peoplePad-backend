const express = require('express')
const createContactController = require('../controller/contact/createContactController')
const authMiddleware = require('../middlewares/authMiddleware')
const multer = require('multer')
const getContactController = require('../controller/contact/getContactController')
const updateContactController = require('../controller/contact/updateContactController')
const deleteContactController = require('../controller/contact/deleteContactController')
const router = express.Router()
const cloudinary = require('../config/cloudinaryConfig')
const {CloudinaryStorage} = require('multer-storage-cloudinary')

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, uniqueSuffix + '-' + file.originalname)
//     }
// })

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'contact-avatars',
        allowed_formats: ['jpeg', 'png', 'jpg', 'webp']
    }
})

const upload = multer({ storage: storage })

router.post('/create-contact', authMiddleware, upload.single('avatar'), createContactController)
router.get('/get-contacts', authMiddleware, getContactController)
router.put('/update-contact/:id', authMiddleware, upload.single('avatar'), updateContactController)
router.delete('/delete-contact/:id', authMiddleware, deleteContactController)

module.exports = router
const multer = require('multer');
const cloudinary = require('../config/cloudinaryConfig');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

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
        folder: async (req, file) => {
            if (req.originalUrl.includes('profile')) {
                return 'user-profiles';
            } else {
                return 'contact-avatars';
            }
        },
        resource_type: 'auto',
        allowed_formats: ['jpeg', 'png', 'jpg', 'webp']
    }
});

const upload = multer({ storage: storage });
module.exports = upload;
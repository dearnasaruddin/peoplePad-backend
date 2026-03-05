const mongoose = require('mongoose')
const { Schema } = mongoose

const contactSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    name: String,
    phone: String,
    avatarUrl: String
})

module.exports = mongoose.model('Contact', contactSchema)
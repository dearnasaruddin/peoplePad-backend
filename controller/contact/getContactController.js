const Contact = require('../../model/contactModel')

const getContactController = async (req, res) => {
    const contacts = await Contact.find({userId: req.user.id})
    res.send(contacts)
}

module.exports = getContactController
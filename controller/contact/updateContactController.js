const Contact = require("../../model/contactModel")

const updateContactController = async (req, res) => {
    try {
        const { name, phone } = req.body

        const contact = await Contact.findOne({ _id: req.params.id, userId: req.user.id })
        if (!contact) return res.send({ error: 'Contact not found' })

        if (name) contact.name = name
        if (phone) contact.phone = phone
        contact.avatarUrl = req.file ? req.file.path : null

        await contact.save()
        res.send({ message: 'Contact updated successful' })

    } catch (error) {
        res.send({ error: error.message })
    }
}

module.exports = updateContactController
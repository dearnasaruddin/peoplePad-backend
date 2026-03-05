const Contact = require('../../model/contactModel')

const deleteContactController = async (req, res) => {
    try {
        const contact = await Contact.findOneAndDelete({ _id: req.params.id, userId: req.user.id })
        if (!contact) return res.send({ error: 'Contact Not found' })

        res.send({ message: 'Contact deleted successful' })
    } catch (error) {
        res.send({ error: error.message })
    }
}

module.exports = deleteContactController
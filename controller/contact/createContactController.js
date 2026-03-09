const Contact = require('../../model/contactModel')

const createContactController = async (req, res) => {
    try {
        const { name, phone } = req.body
        const avatar = req.file

        const contact = new Contact({
            userId: req.user.id,
            name,
            phone,
            avatarUrl: avatar?.path || null
        })

        await contact.save()

        res.send({ message: 'Contact created successful' })
    } catch (error) {
        res.send({ error: error.message })
    }

}

module.exports = createContactController
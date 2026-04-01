const Contact = require('../../model/contactModel')

const getContactController = async (req, res) => {

    try {
        const { page = 1, limit = 10, search } = req.query

        const query = { userId: req.user.id }
        if (search) {
            query.name = {
                $regex: search,
                $option: 'i'
            }
        }

        const totalItems = await Contact.countDocuments()
        const contacts = await Contact.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit))

        res.send(
            {
                page: Number(page),
                limit: Number(limit),
                totalItems: totalItems,
                totalPage: Math.ceil(totalItems / limit),
                contacts
            })

    } catch (error) {
        res.send({ error: error.message })
    }
}

module.exports = getContactController
const User = require('../../model/userModel')

const deleteProfileController = async (req, res) => {
    try {
        const userExist = await User.findByIdAndDelete(req.user.id)
        if (!userExist) return res.send({ error: 'No user found' })
        res.send({ message: 'Account deleted successful' })
    } catch (error) {
        console.log(error.message)
        res.send({ error: 'Something went wrong' })
    }
}

module.exports = deleteProfileController
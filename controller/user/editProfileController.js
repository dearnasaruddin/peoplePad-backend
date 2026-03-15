const User = require('../../model/userModel')

const editProfileController = async (req, res) => {
    try {
        const { username, email } = req.body

        const userExist = await User.findById(req.user.id)
        if (!userExist) return res.send({ error: 'User not found' })

        if (username) userExist.username = username
        if (email) userExist.email = email
        if (req.file) userExist.avatarUrl = req.file.path

        await userExist.save()

        res.send({ message: 'Profile updated successful', user: userExist })
    } catch (error) {
        res.send({ error: error.message })
    }
}

module.exports = editProfileController
const User = require('../../model/userModel')
const bcrypt = require('bcryptjs')

const changePasswordController = async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmNewPassword } = req.body

        const userExist = await User.findById(req.user.id)
        if (!userExist) return res.send({ error: 'User not found' })

        const isPassMatch = await bcrypt.compare(currentPassword, userExist.password)
        if (!isPassMatch) return res.send({ error: 'Wrong password' })

        if (newPassword !== confirmNewPassword) return res.send({ error: 'Confirm Password must be same as New Password' })

        const hashedPass = await bcrypt.hash(newPassword, 10)
        userExist.password = hashedPass
        await userExist.save()

        res.send({ message: 'Password changed successfully' })

    } catch (error) {
        res.send({ error: error.message })
    }
}

module.exports = changePasswordController
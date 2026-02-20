const User = require('../../model/userModel')
const sendResetEmail = require('../../utils/sendResetEmail')

const forgotPassController = async (req, res) => {
    const { email } = req.body
    const userExist = await User.findOne({ email: email })

    if (!userExist) return res.send({ error: 'User Not Found' })
    await sendResetEmail(userExist)

    res.send({message: 'Please check your email for reset password'})

}

module.exports = forgotPassController
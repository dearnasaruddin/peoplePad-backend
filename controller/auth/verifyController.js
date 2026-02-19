const jwt = require('jsonwebtoken')
const User = require('../../model/userModel')
const sendVerifyEmail = require('../../utils/sendVerifyEmail')

const verifyController = async (req, res) => {
    const { token } = req.params

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET)

        // ======== User finding & Error Checking ========
        const userExist = await User.findById(decoded.id)
        if (!userExist) return res.send({ error: 'invalid token' })
        if (userExist.isVerified) return res.send({ error: 'Email is already verified' })

        userExist.isVerified = true
        await userExist.save()

        res.send({ message: 'Email verification successful' })

    } catch (err) {

        // ======== New mail sent for expired token ========
        if (err.name === 'TokenExpiredError') {
            
            const decoded = jwt.decode(token)
            const userExist = await User.findById(decoded.id)
            if (!userExist) return res.send({ error: 'User not found' })
            if (userExist.isVerified) return res.send({ error: 'Email is already verified' })

            await sendVerifyEmail(userExist)
            return res.send({ error: 'Token Expired. New verification mail has sent' })
        }

        res.send({ error: 'Invalid Token' })
        console.log('verification failed ' + err.message)
    }
}

module.exports = verifyController
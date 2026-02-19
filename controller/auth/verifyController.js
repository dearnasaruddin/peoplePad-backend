const jwt = require('jsonwebtoken')
const User = require('../../model/userModel')

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
        res.send({error: 'Invalid Token or Expired'})
        console.log('verification failed ' + err)
    }
}

module.exports = verifyController
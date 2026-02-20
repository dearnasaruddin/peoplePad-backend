const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../../model/userModel')

const resetPassController = async (req, res) => {
    const { token } = req.params
    const { password } = req.body

    try {
        
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET)
        const userExist = User.findById(decoded.id)
        if (!userExist) return res.send({ error: 'Invalid Token' })

        const newPass = bcrypt.hash(password, 10)
        userExist.password = newPass
        await userExist.save()

        res.send({ message: 'Password reset successful' })

    } catch (err) {
        res.send({ error: 'Token Invalid or Expired' })
        console.log('Password Reset failed ' +  err)
    }

}

module.exports = resetPassController
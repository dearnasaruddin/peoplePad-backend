const bcrypt = require('bcryptjs')
const User = require('../../model/userModel')
const { generateRefreshToken, generateAccessToken } = require('../../utils/generateToken')

const loginController = async (req, res) => {
    const { email, password } = req.body

    // =========== validation ============
    let errors = {}
    let pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    
    if (!email) {
        errors.email = 'email is required'
    }
    if (!pattern.test(email)) {
        errors.email = 'enter a valid email'
    }
    if (!password) {
        errors.password = 'password is required'
    }
    if (errors.email || errors.password) {
        return res.send({ errors })
    }
    
    
    // =========== Finding User & Checking accessibility ============
    const userExist = await User.findOne({ email: email })
    if (!userExist) return res.send({ error: 'invalid credentials' })
    const isPassMatch = await bcrypt.compare(password, userExist.password)
    if (!isPassMatch) return res.send({ error: 'invalid credentials' })
    if(!userExist.isVerified) return res.send({ error: 'Verify email for login' })

    const accessToken = generateAccessToken(userExist)
    const refreshToken = generateRefreshToken(userExist)

    userExist.refreshToken = refreshToken
    await userExist.save()
    
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 365 * 24 * 60 * 60 * 1000
    })
    res.send({
        massage: 'login successful',
        username: userExist.username,
        email: userExist.email,
        accessToken
    })

}

module.exports = loginController
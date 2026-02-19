const bcrypt = require('bcryptjs')
const User = require('../../model/userModel')
const sendVerifyEmail = require('../../utils/sendVerifyEmail')

const registrationController = async (req, res) => {

    const { username, email, password } = req.body

    // =========== validation ============
    let errors = {}
    let pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (!username) {
        errors.username = 'username is required'
    }
    if (!email) {
        errors.email = 'email is required'
    }
    if (!pattern.test(email)) {
        errors.email = 'enter a valid email'
    }
    if (!password) {
        errors.password = 'password is required'
    }
    if (errors.username || errors.email || errors.password) {
        return res.send({ errors })
    }

    // ======== Duplicate Email Checking ========
    const userExist = await User.findOne({ email: email })
    if (userExist) return res.send(`${email} already exist`)

    const hashed = await bcrypt.hash(password, 10)

    const user = new User({
        username,
        email,
        password: hashed,
        isVerified: false
    })

    try {
        await user.save()
        await sendVerifyEmail(user)
        res.send('Registration Successful. Please check your email for verification.')
    } catch (error) {
        console.log("While trying to save data in database " + error)
    }
}

module.exports = registrationController
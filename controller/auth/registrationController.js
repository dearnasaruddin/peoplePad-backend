const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const User = require('../../model/userModel')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS
    }
})

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
        res.send({ errors })
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
        const verificationToken = jwt.sign({ id: user._id }, process.env.ACCESS_SECRET, { expiresIn: "1d" })
        const verifyLink = `${process.env.CLIENT_URL}/verify/${verificationToken}`

        transporter.sendMail({
            from: process.env.USER_EMAIL,
            to: user.email,
            subject: `${user.username} please verify your email`,
            html: `
            <table align="center" cellpadding="0" cellspacing="0" style="max-width:600px; background-color:#ffffff; margin-top:30px; border-radius:8px; overflow:hidden; border: 1px solid #eeeeee;" width="100%">
                <tr>
                    <td style="background-color:#007bff; padding:30px 20px; color:#ffffff;" align="center">
                        <h1 style="margin:0; font-size:24px; font-family: Arial, sans-serif;">Confirm Your Email</h1>
                    </td>
                </tr>

                <tr>
                    <td style="padding:30px 20px; color:#333333; font-family: Arial, sans-serif;">
                        <p style="font-size:16px; line-height:1.6; margin:0 0 10px;">Hello <span style="text-transform:capitalize">${username}</span>,</p>
                        <p style="font-size:16px; line-height:1.6; margin:0 0 20px;">
                            Thank you for signing up for PeoplePad! To complete your registration, please confirm your email address by clicking the button below.
                        </p>

                        <div style="text-align:center; margin:30px 0;">
                            <a href=${verifyLink} style="background-color:#007bff; color:#ffffff; text-decoration:none; padding:14px 28px; border-radius:5px; display:inline-block; font-size:16px; font-weight: bold;">Confirm Email</a>
                        </div>

                        <p style="font-size:14px; line-height:1.6; color:#555555; margin: 20px 0 0;">
                            If you did not create an account, no action is required. This link will expire in 24 hours.
                        </p>
                    </td>
                </tr>

                <tr>
                    <td style="background-color:#f5f5f5; text-align:center; padding:20px; font-size:12px; color:#999999; font-family: Arial, sans-serif;">
                        &copy; ${new Date().getFullYear()} PeoplePad. All rights reserved.
                    </td>
                </tr>
            </table>
            `
        })

        res.send('Registration Successful. Please check your email for verification.')
    } catch (error) {
        console.log("While trying to save data in database " + error)
    }
}

module.exports = registrationController
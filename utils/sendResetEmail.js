const transporter = require('../config/transporterConfig')
const { generateResetToken } = require('./generateToken')

const sendResetEmail = async (user) => {

    const resetToken = generateResetToken(user)
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`

    await transporter.sendMail({
        from: process.env.USER_EMAIL,
        to: user.email,
        subject: `${user.username} please reset your password`,
        html: `
            <table align="center" cellpadding="0" cellspacing="0" style="max-width:600px; background-color:#ffffff; margin-top:30px; border-radius:8px; overflow:hidden; border: 1px solid #eeeeee;" width="100%">
                <tr>
                    <td style="background-color:#007bff; padding:30px 20px; color:#ffffff;" align="center">
                        <h1 style="margin:0; font-size:24px; font-family: Arial, sans-serif;">Reset Your Password</h1>
                    </td>
                </tr>

                <tr>
                    <td style="padding:30px 20px; color:#333333; font-family: Arial, sans-serif;">
                        <p style="font-size:16px; line-height:1.6; margin:0 0 10px;">Hello <span style="text-transform:capitalize">${user.username}</span>,</p>
                        <p style="font-size:16px; line-height:1.6; margin:0 0 20px;">
                            To reset your password for PeoplePad! click the button below.
                        </p>

                        <div style="text-align:center; margin:30px 0;">
                            <a href=${resetLink} style="background-color:#007bff; color:#ffffff; text-decoration:none; padding:14px 28px; border-radius:5px; display:inline-block; font-size:16px; font-weight: bold;">Reset password</a>
                        </div>

                        <p style="font-size:14px; line-height:1.6; color:#555555; margin: 20px 0 0;">
                            If you did not request for reset password, no action is required. This link will expire in 15 minutes.
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
}

module.exports = sendResetEmail
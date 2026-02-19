const jwt = require('jsonwebtoken')
const User = require('../../model/userModel')
const { generateAccessToken } = require('../../utils/generateToken')

const refreshController = async (req, res) => {
    const { refreshToken } = req.cookies
    if (!refreshToken) return res.send({ error: 'No token found' })

    const userExist = await User.findOne({ refreshToken: refreshToken })
    if (!userExist) return res.send({ error: 'Invalid Token' })

    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
        if (err) return res.send({ error: 'Invalid Token' })
        const accessToken = generateAccessToken(userExist)
        res.send({ accessToken })
    })
}

module.exports = refreshController
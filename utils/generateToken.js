const jwt = require('jsonwebtoken')

const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user._id }, 
        process.env.ACCESS_SECRET, 
        { expiresIn: "15m" }
    )
}

const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user._id }, 
        process.env.REFRESH_SECRET, 
        { expiresIn: "365d" }
    )
}

module.exports = { generateAccessToken, generateRefreshToken }
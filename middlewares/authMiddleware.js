const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) return res.send({ error: 'You are not authorized' })

    const token = authorization.split(' ')[1]

    jwt.verify(token, process.env.ACCESS_SECRET, (err, decode) => {
        if (err) return res.send({ error: 'You are not authorized' })
        req.user = decode
        next()
    })

}

module.exports = authMiddleware
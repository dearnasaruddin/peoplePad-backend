require('dotenv').config()
require('./jobs/emailWorker')
const cors = require('cors')
const express = require('express')
const cookieParser = require('cookie-parser')
const databaseConfig = require('./config/databaseConfig')
const authRoutes = require('./routes/authRoutes')
const contactRoutes = require('./routes/contactRoutes')
const userRoutes = require('./routes/userRoutes')
const healthRoutes = require('./routes/healthRoutes')
const limiter = require('./middlewares/rateLimiterMiddleware')

const app = express()
databaseConfig()

// ======== middlewares ==========
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use(limiter)
app.use(cookieParser())
app.use(authRoutes)
app.use(contactRoutes)
app.use(userRoutes)
app.use(healthRoutes)


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
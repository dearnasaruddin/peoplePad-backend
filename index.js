require('dotenv').config()
const cors = require('cors')
const express = require('express')
const cookieParser = require('cookie-parser')
const databaseConfig = require('./config/databaseConfig')
const authRoutes = require('./routes/authRoutes')



const app = express()
databaseConfig()

// ======== middlewares ==========
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(authRoutes)


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
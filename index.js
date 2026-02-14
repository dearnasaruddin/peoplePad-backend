const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const databaseConfig = require('./config/databaseConfig')
const authRoutes = require('./routes/authRoutes')

dotenv.config()

const app = express()
databaseConfig()

// ======== middlewares ==========
app.use(express.json())
app.use(cookieParser())
app.use(authRoutes)


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
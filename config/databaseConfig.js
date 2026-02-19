const mongoose = require('mongoose')

let databaseConfig = ()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log('Database Connected unsuccessful ' + err))
}

module.exports = databaseConfig
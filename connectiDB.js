const mongoose = require('mongoose');

const connectionDB = async() => {
    return mongoose.connect(process.env.MONGODB_URI)
}

module.exports = {
    connectionDB
}
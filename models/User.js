const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true
    },
    emailid: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    terms: {
        type: Boolean,
    },
    
}, {timestamps: true})

module.exports = mongoose.model('Member', userSchema)  //exporting the schema as a model
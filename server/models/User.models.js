const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true, 
        required: [true, "Name is required"]
    },
    email: {
        type: String, 
        uniqie: true,
        required: [true, "Email is required"],
        lowercase: true,
        trim: true,

        validate: {
            validator: function(value) {
                return validator.isEmail(value)
            },
            message: 'Please enter a valid email address'
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: 6,
        select: false
    }
}, {timestamps: true})

const User = new mongoose.model('User', userSchema)
module.exports = User
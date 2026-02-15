const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "name is required"]
    }, 
    organizer: {
        type: String,
        trim: true,
        required: [true, "Organizer is required"]
    },
    location: {
        type: String, 
        trim: true,
        required: [true, "location is required"]
    },
    date: {
        type: Date, 
        required: [true, "date is required"]
    },
    description: {
        type: String,
        trim: true
    },
    capacity: {
        type: Number,
        required: [true, "capacity is required"]
    },
    category: {
        type: String,
        enum: [ "Technology",
        "Business",
        "Education",
        "Workshop",
        "Seminar",
        "Conference",
        "Music",
        "Sports",
        "Health",
        "Art",
        "Networking",
        "Startup",
        "Community",
        "Online",
        "Other"],
        required: true
    }
}, {timestamps: true})

const Event = new mongoose.model('Event', eventSchema)
module.exports = Event
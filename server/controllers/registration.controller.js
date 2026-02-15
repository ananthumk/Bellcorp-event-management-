const Event = require("../models/Event.models")
const Registration = require("../models/Registration.model")

const registerEvent = async(req, res) => {
    try {
        const { eventId } = req.query 

        const event = await Event.findById(eventId)
        if(!event) return res.status(404).json({message: 'Event not found'})
        
        const count = await Registration.countDocuments({ event: eventId})
        if(count >= event.capacity) return res.status(400).json({message: 'Event full! No slot available'})

        const registration = await Registration.create({
            user: req.userId,
            event: eventId
        })

        res.status(201).json(registration)
    } catch (error) {
        console.log('Registration register event: ', error.message)
        res.status(500).json({message: 'Something went wrong! try again later'})
    }
}

const getMyEvents = async(req, res) => {
    try {
        const registrations = await Registration.find({ user: req.userId }).populate("event")
        res.status(200).json(registrations)
    } catch (error) {
        console.log('Get My events: ', error.message)
        res.status(500).json({message: "Something went wrong! try again later"})
    }
}

module.exports = {registerEvent, getMyEvents}
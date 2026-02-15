const Event = require('../models/Event.models')

const getEvents = async (req, res) => {
    try {
        const { page, search, category, location} = req.query

        const p = parseInt(page) || 1
        const limit =  12

        const skip = (p - 1) * limit
        
        let query = {}

        if(search) query.name = {$regex: search, $options: 'i'}
        if(category) query.category = category
        if(location) query.location = location

        const events = await Event.find(query).skip(skip).limit(limit).sort({ createdAt: -1 })

        const total = await Event.countDocuments(query)

        res.status(200).json({
            total,
            page: p,
            totalPages: Math.ceil(total /limit),
            events})

    } catch (error) {
        console.log('Get Events: ', error.message)
        res.status(500).json({message: "Something went wrong! try again later"})
    }
}

const getEvent = async(req, res) => {
    try {
        const {eventId} = req.body 

        const event = await Event.findById(eventId)

        if(!event) return res.status(404).json({message: 'Event not found'})

        res.status(200).json(event)
    } catch (error) {
        console.log('get event: ', error.message)
        res.status(500).json({message: 'Something went wrong! try again later'})
    }
}

module.exports =  {getEvents, getEvent} 
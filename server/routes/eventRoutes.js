const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth.middleware')
const {getEvents, getEvent} = require('../controllers/event.controller')

router.get('/', authMiddleware, getEvents)
router.get('/:id', authMiddleware, getEvent )

module.exports = router
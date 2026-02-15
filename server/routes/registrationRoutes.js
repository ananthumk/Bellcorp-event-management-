const express = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const {registerEvent, getMyEvents} = require('../controllers/registration.controller')
const router = express.Router()

router.post('/register/:id', authMiddleware, registerEvent)
router.get('/', authMiddleware, getMyEvents)

module.exports = router
const express = require('express')
const app = express()
const cors = require('cors')
const authRouter = require('./routes/authRoutes')
const eventRouter = require('./routes/eventRoutes')
const registrationRouter = require('./routes/registrationRoutes')
const db = require('./config/db')
require('dotenv').config()

app.use(cors())
app.use(express.json())

//Database connection
db()

//Routes 
app.use('/api/auth/', authRouter )
app.use('/api/event', eventRouter)
app.use('/api/registration', registrationRouter)

const PORT = process.env.PORT || 5000 

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))

module.exports = app
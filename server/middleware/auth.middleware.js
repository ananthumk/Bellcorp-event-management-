const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({ message: "token required" })
        }

        const token = authHeader.split(' ')[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.userId = decoded.userId

        next()
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Invalid or expired token' })
    }
}

module.exports = authMiddleware
const User = require("../models/User.models")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '5d'})
}

const register = async (req, res) => {
    try {
        const {name, email, password} = req.body 

        const existUser = await User.findOne({email})

        if(existUser) return res.status(400).json({message: 'User already exists'})

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name, email, password: hashedPassword
        })
        
        const token = await generateToken({id: user._id})

        res.status(201).json({
            message: 'User created',
            user, 
            token
        })

    } catch (error) {
        console.log('Register: ', error.message)
        res.status(500).json({message: "Something went wrong! try again later"})
    }
}

const login = async(req, res) => {
      try {
        const {email, password} = req.body 

        const user = await User.findOne({email})

        if(!user) return res.status(404).json({message: 'User not found'})

        const matchPassword = await bcrypt.compare(password, user.password)

        if(!matchPassword) return res.status(400).json({message: 'Invalid password'})

        const token = await generateToken({id: user._id})
        
        res.status(200).json({
            message: 'User logged in',
            user,
            token
        })
    } catch (error) {
        console.log('Login: ', error.message)
        res.status(500).json({message: "Something went wrong! try again later"})
    }
}

module.exports = {register, login}
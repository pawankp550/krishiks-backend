const jwt = require('jsonwebtoken')
const User = require('../models/user')
const auth = async (req, res, next) => {
    try{
        console.log('in auth')
        const token = req.header('Authorization')
        const decodedToken = await jwt.verify(token, process.env.TokenText)
        const user = await User.findOne({ _id: decodedToken._id })
        if (!user) {
            throw new Error
        }
        console.log('auth done')
        req.user = user
        req.token = token
        next()
    } catch (e) {
        res.status(501).send(e+' please authenticate')
    }
}

module.exports = auth
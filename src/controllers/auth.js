const User = require('../models/user')
const { errorHandler } = require('../helpers/dbErrorHandlers')

exports.signup = async (req, res) => {
    const user = new User(req.body)
    try{
        const savedUser = await user.save()
        const publicProfile = savedUser.getPublicProfile()
        res.status(201).send(publicProfile)
    }
    catch (e) {
        res.status(409).json({error: e})
    }
}

exports.signin = async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body)
        const publicProfile = user.getPublicProfile()
        const token = await user.createWebToken()
        res.cookie('tkn', token, { expire: new Date() + 9999 })
        res.status(200).send({ publicProfile, token })
    } catch (e) {
        res.status(404).json({error: e})
    }
}

exports.signout = (req, res) => {
    res.clearCookie('tkn')
    res.status(200).send({ message: 'signout successfull' })
}
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('email is not valid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if(value.toLowerCase().includes('password')){
                throw new Error('password should not contain "password"')
            }
        }
    },
    about: {
        type: String,
        trim: true
    },
    role: {
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    }
},
    { timestamps: true }
)


// hash password before saving. works for new user and updating user
userSchema.pre('save', async function (next) {
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// Instance method for adding JWT in user details
userSchema.methods.createWebToken = async function () {
    const User = this
    const Token = await jwt.sign({_id: User._id}, process.env.TokenText )
    return Token
}

// filter user info to send back
userSchema.methods.getPublicProfile = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    return userObject
}

// check if user is present and authenticate
userSchema.statics.findByCredentials = async function ({email, password}) {
    const user = await User.findOne({ email: email })
    if (!user) {
        throw new Error('user not present')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('email or password is wrong')
    }

    return user
}

// // create webToken
// userSchema.methods.createWebToken = async function () {
//     cosole.log('in cred')
//     const User = this
//     console.log('crete sd' + User)
//     const Token = await jwt.sign({_id: User._id}, process.env.TokenText )
//     return Token
// }

const User = mongoose.model('User', userSchema)
module.exports = User

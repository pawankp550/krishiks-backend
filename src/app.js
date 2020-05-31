const express = require('express')
const app = express()
const morgan = require('morgan')
const cookieparser = require('cookie-parser')
const bodyParser = require('body-parser')
var cors = require('cors')

require('dotenv').config()
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const categoryRouter = require('./routes/category')
const sellerRouter = require('./routes/seller')
const productRouter = require('./routes/product')
const orderRouter = require('./routes/order')
const BraintreeRouter = require('./routes/braintree')

// db connection
require('../src/Db/DbConnection')

// cors setting
app.use(cors())

// parse data from request body middleware
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))

// HTTP request logger middleware
app.use(morgan('dev'))

// cookie parser middleware
app.use(cookieparser())

// Routes
app.use('/api', authRouter)
app.use('/api', userRouter)
app.use('/api', categoryRouter)
app.use('/api', productRouter)
app.use('/api', BraintreeRouter)
app.use('/api', orderRouter)
app.use('/api', sellerRouter)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log('server started')
})
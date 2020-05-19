const router = require('express').Router()
const auth = require('../middleware/auth')
const { generateToken, processPayment } = require('../controllers/braintree')

// get braintree token
router.get('/braintree/getToken', auth, generateToken)

// post payment data
router.post('/braintree/payment', auth, processPayment)

module.exports = router
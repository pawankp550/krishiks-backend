const braintree = require('braintree')

var gateway = braintree.connect({
    environment:  braintree.Environment.Sandbox,
    merchantId:   process.env.BRAINTREE_MERCHANT_ID,
    publicKey:    process.env.BRAINTREE_PUBLIC_KEY,
    privateKey:   process.env.BRAINTREE_PRIVATE_KEY
});

exports.generateToken = async (req, res) => {
    gateway.clientToken.generate({}, function (err, response) {
        if (err) {
            res.status(500).send(err)
        } else {
            res.send(response)
        }
    })
}

exports.processPayment = (req, res) => {
    console.log('in processPayment')
    let nonceFromTheClient = req.body.paymentMethodNonce
    let amountFromClient = req.body.amountFromClient

    gateway.transaction.sale({
            amount: amountFromClient,
            paymentMethodNonce: nonceFromTheClient,
            options: {
                submitForSettlement: true
            }
        }, function (err, result) {
            if(err) {
                res.status(500).json(err)
            } else {
                res.json(result)
            }
    })
}

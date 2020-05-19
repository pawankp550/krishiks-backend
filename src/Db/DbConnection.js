const mongoose = require('mongoose')

// database connection
mongoose.connect(process.env.DataBaseString, { 
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        autoIndex: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log('db connected')
    })
    .catch((e) => {
        console.log(e)
    })

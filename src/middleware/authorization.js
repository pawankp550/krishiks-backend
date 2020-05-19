exports.isUser = async (req, res, next) => {
    try{
        if (req.user._id.toString() === req.params.id) {
            next()
            }
        else {
        res.status(401).send('unauthorized')
        }
    } catch (e) {
        res.status(500).send()
    }
}


exports.isAdmin = async (req, res, next) => {
    try{
        if(req.user.role === 1) {
            next()
            }
        else {
        res.status(401).send('unauthorized')
        }
    } catch (e) {
        res.status(500).send()
    }
}

exports.isUserOrAdmin = (req, res, next) => {
     try{
        if (req.user._id.toString() === req.params.id || req.user.role === 1) {
            next()
            }
        else {
        res.status(401).send('unauthorized')
        }
    } catch (e) {
        res.status(500).send()
    }
}


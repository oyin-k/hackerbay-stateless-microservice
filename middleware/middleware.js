const jwt = require('jsonwebtoken');
require('dotenv').load();

exports.verifyToken = (req, res, next) => {
    // check the request headers for available token
    const token = req.headers.token;
    
    if (token) {
        // verify secret and check expiry
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                return res.json({ isAuthorized: false, error: 'Failed to authenticate token' });
            } else {
                //if there's no error, decode the token and pass it to the next operation
                req.user = decoded;
                next();
            }
        })
    } else {
        //if there is no token return error
        res.status(404).send({isAuthorized: false, error: 'No token available'});
    }
} 
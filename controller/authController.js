const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator/check');
require('dotenv').load();

exports.sign_in = [
    //carry out validation for sign-in details
    body('username', 'Username is required')
        .isLength({min: 3}).withMessage('Username should be more than 3 characters')
        .trim(),
    
    body('password')
        .isLength({min: 6}).withMessage('Password should be more than 6 characters')
        .matches('[0-9]').withMessage('Password must contain at least 1 number.'),

    //carry out request after validation process.
    (req, res, next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            res.status(400).send({errors: errors.array()})
        } else {
            const username = req.body.username;
            const password = req.body.password;

            const token = jwt.sign({username: username}, process.env.SECRET, {expiresIn: "1 day"});

            req.headers['token'] = token;
            res.status(200).send({user: username, isAuthorized:true, jwtToken: token});
            next();
        }
    }
]

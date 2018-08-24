const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').load();

exports.sign_in = (req, res, next) => {
        const username = req.body.username;
        const password = req.body.password;

        if(username.length > 0 && password.length > 0) {
            const token = jwt.sign({username: username}, process.env.SECRET, {expiresIn: "1 day"});

            req.headers['token'] = token;
            res.status(200).send({user: username, isAuthorized:true, jwtToken: token});
            next();
        } else {
            res.status(400).send('Details do not match requirements');
        }
        
    }

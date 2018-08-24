const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').load();

exports.sign_in = (req, res, next) => {
        const username = req.body.username;
        const password = req.body.password;
        const token = jwt.sign({username: username}, process.env.SECRET, {expiresIn: "1 day"});

        req.headers['token'] = token;
        res.status(200).send({user: username, isAuthorized:true, token: token});
        next();
    }


// make exports for both sign-up nd sign-in
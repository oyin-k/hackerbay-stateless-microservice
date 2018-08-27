const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const authRoute = require('./routes/authRoute');
const jsonPatchRoute = require('./routes/jsonPatchRoute');
const { verifyToken } = require('./middleware/middleware');

const app = express();

app.use(morgan('dev')); 
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use('/api/auth', authRoute);
app.use('/api', verifyToken , jsonPatchRoute);



// error handler
app.use((err, req, res, next) => {
    res.status(400).send({error: err.message});
})

module.exports = app;
'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    sequelize = require('sequelize'),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    path = require('path');

var hookJWTStrategy = require('./services/passportStrategy');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(passport.initialize());

hookJWTStrategy(passport);

app.use(express.static(__dirname + '/../client'));

app.use('/api', require('./routes/api')(passport));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/../client/app/index.html'));
});

app.listen('8080', function() {
    console.log('Students Record Portal at http://localhost:8080/!');
});

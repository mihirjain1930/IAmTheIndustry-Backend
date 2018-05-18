const express = require('express');
const userRoutes = express.Router();
var ctrlAuth = require('./login');

userRoutes.post('/userLogin', function(req, res) {
    ctrlAuth.login(req, res);
});

userRoutes.post('/usersignin', function(req, res) {
    ctrlAuth.register(req, res);
})
module.exports = userRoutes;
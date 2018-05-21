const express = require('express');
const userRoutes = express.Router();
var userAuth = require('./../controllers/login');

userRoutes.post('/usersignup', function(req, res) {
    userAuth.register(req, res);
})
userRoutes.post('/userlogin', function(req, res) {
    userAuth.login(req, res);
})
module.exports = userRoutes;
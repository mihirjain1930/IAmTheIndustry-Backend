const express = require('express');
const userRoutes = express.Router();
var userAuth = require('./../controllers/login');

userRoutes.post('/usersignup', (req, res) => {
    userAuth.register(req, res);
})

userRoutes.get('/userdetails/:id', (req, res) =>{
    userAuth.findUser(req, res);
})

userRoutes.get('/logout/:email', (req, res) => {
    userAuth.logout(req, res);
})
module.exports = userRoutes;
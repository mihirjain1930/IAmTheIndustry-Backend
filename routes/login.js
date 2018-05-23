const express = require('express');
const userRoutes = express.Router();
var userAuth = require('./../controllers/login');
var userPost = require('./../controllers/createpost')


userRoutes.post('/usersignup', (req, res) => {
    userAuth.register(req, res);
})
userRoutes.post('/userlogin', function(req, res) {
    userAuth.login(req, res);
})
userRoutes.get('/userdetails/:id', (req, res) =>{
    userAuth.findUser(req, res);
})

userRoutes.post('/create', (req, res) =>{
    userPost.create(req, res);
})

userRoutes.get('/logout/:email', (req, res) => {
    userAuth.logout(req, res);
})
module.exports = userRoutes;
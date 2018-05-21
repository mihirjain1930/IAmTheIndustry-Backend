const express = require('express');
const Users = require('./../models/login');
const jwt = require('jsonwebtoken');
const config = require('./../config/config.json');
const moment = require('moment');


function generateToken(email) {
    const token = config.token;
    let payload = {
    iss: 'my.domain.com',
    sub: email,
    iat: moment().unix(),
    exp: moment().add(7, 'days').unix()
    };
    return jwt.sign(payload, token);
}

module.exports.register = (req, res) => {
    let outputJSON = {};
    let userDetails = req.body.userDetails;
    let loginType = userDetails.loginType;
    let users = Users();
    let token = generateToken(userDetails.profile.U3);
    users.token = token;
    users.social_id = userDetails.profile.Eea;
    users.email = userDetails.profile.U3;
    users.name = userDetails.profile.ig;
    users.picture = userDetails.profile.Paa;
    users.type = loginType;
    if (loginType == '3' || loginType == '2') {
        Users.findOne({
            email: userDetails.profile.U3
        }, (err, resp) => {
            if (resp) {
                Users.findOneAndUpdate({
                    email: userDetails.profile.U3
                }, {
                    $set: {
                        token: token
                    }
                }, (err, response) => {
                    outputJSON = {
                        status: 200,
                        data: response
                    }
                    res.status(200).send(outputJSON)
                });
            }
            else {
                users.save((err, response) => {
                    if (response) {
                        outputJSON = {
                            status: 200,
                            data: response
                        }
                        res.status(200).send(outputJSON)
                    }
                })
            }
        })
    }
}

module.exports.findUser = (req, res) => {
    let id = req.params.id;
    Users.findOne({
        _id: id,
        is_deleted: false
    }, (err, resp) => {
        if (resp) {
            outputJSON = {
                status: 200,
                data: resp
            }
            res.status(200).send(outputJSON)
        }
        else {
            outputJSON = {
                status: 201,
                msg: 'User not found'
            }
            res.status(201).send(outputJSON)
        }
    })
}

module.exports.logout = (req, res) => {
    let email = req.params.email;
    Users.update({
        "email": email
    }, {
        $set: {
            "token": ""
        }
    }, (err, resp) => {
        if (resp) {
            outputJSON = {
                status: 200,
                data: resp
            }
            res.status(200).send(outputJSON)
        }
        else {
            outputJSON = {
                status: 201,
                msg: 'Can not logout'
            }
            res.status(201).send(outputJSON)
        }
    })
}
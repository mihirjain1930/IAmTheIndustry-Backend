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
    users.picture = users.Paa;
    users.type = loginType;
    if (loginType == '3' || loginType == '2') {
        Users.findOne({
            email: userDetails.profile.U3
        }, (err, resp) => {
            if (resp) {
                outputJSON = {
                    status: 200,
                    data: resp
                }
                res.status(200).send(outputJSON)
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
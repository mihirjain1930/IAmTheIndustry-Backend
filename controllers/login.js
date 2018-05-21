const express = require('express');
const Users = require('./../models/login');
const jwt = require('jsonwebtoken');
const config = require('./../config/config.json');
const moment = require('moment');
var passport = require('passport');
var fs = require('fs');
var path = require('path');


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
     if (req.body.loginType != null || req.body.loginType != undefined) {
         var loginType = req.body.loginType;
    }else{
        var loginType = userDetails.loginType;
    }    

    let users = Users();
    if(userDetails != null || userDetails != undefined){
        let token = generateToken(userDetails.profile.U3);
        users.token = token;
        users.social_id = userDetails.profile.Eea; 
        users.name = userDetails.profile.ig;
    }

    if(req.body.email == null || req.body.email == undefined){
        users.email = userDetails.profile.U3;
    }else{
        users.email = req.body.email;
    }

    if (req.body.password != null || req.body.password != undefined) {
         users.setPassword(req.body.password);
    }    
    
    // users.picture = users.Paa;
    users.type = loginType;
    Users.findOne({
        "email": users.email,
        "is_deleted": false
    }, function(eErr, eRes) {
        if (eRes != null || eRes != undefined) {
            if (eRes.type == 2 || eRes.type == 3) {
                outputJSON = {
                    'status': 400,
                    'msg': "User already registered with social account",
                };
                res.status(200).send(outputJSON);
            } else {
                outputJSON = {
                    'status': 400,
                    'msg': "user already registered"
                };
                res.status(200).send(outputJSON);
            }
        } else {
            users.save(function(err, user) {
                if (user) {
                    outputJSON = {
                        'status': 200,
                        'msg': "Registered successfully",
                        'data': user
                    };
                    res.status(200).send(outputJSON);
                }
            });
        }
    });
}

module.exports.login = function(req, res) {
    let users = new Users();
    let outputJSON = "";
    passport.authenticate('local', function(err, user, info) {
        console.log(">>>>>>",info)
        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }
        if (user) {
            var newtoken = user.generateJwt();
            var userId = user._id;
            user.token = newtoken;
            // user.fcmToken = req.body.fcmToken;
            // user.deviceplatform = req.body.deviceplatform;

            Users.update({
                email: req.body.email
            }, {
                $set: {
                    token: user.token,
                    //fcmToken: user.fcmToken,
                    //deviceplatform: user.deviceplatform
                }
            }, {
                "upsert": true,
                "new": true
            }, function(err, response) {
                if (response) {
                    outputJSON = {
                        'status': 200,
                        'data': user
                    };
                    res.status(200).send(outputJSON);
                }
            })
            //}
        } else if (info.status == -1) {
         
            outputJSON = {
                'status':400,
                'msg': "invalid credentials"
            };
            res.status(200).send(outputJSON);
        } else if (info.status == -2) {
         
            outputJSON = {
                'status': 400,
                'msg': "invalid credentials"
            };
            res.status(200).send(outputJSON);
        } else if (info.status == -3) {
           
            outputJSON = {
                'status': 400,
                'msg': "invalid credentials"
            };
            res.status(200).send(outputJSON);
        }
    })(req, res);
};





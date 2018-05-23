'use strict';
const Users = require('./../models/login');
var mongoose = require('mongoose');
let LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');

module.exports = function(passport) {
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            console.log("====",email,password);
            process.nextTick(function() {               
                Users.findOne({ 'email': email , is_deleted : false }, function(err, user) {

                    console.log("user",user)
                    // Don't give the HACKER any indication of their successes/failures, if they guess a correct email by us telling them "invalid password", they know they got a hit on the email and so it makes their task of breaking in that much easier!
                    var genericErrorMessage = "Invalid user";
                    var genericErrorMessage1 = "Login successfull";
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        return done(null, false, {
                            status: -1,
                            // generic "No!"
                            message: genericErrorMessage
                        });
                    }
                    if(user){
                        if (!user.validPassword(password)) {
                        return done(null, false, {
                            status: -2,
                            // generic "No!"
                            message: genericErrorMessage
                        });
                        }else{
                            return done(null, user);
                        }
                                
                    }                    
                    else{
                        return done(null,false,{
                            status: -2,
                            message:"invalid user"
                        });
                    }
                });
            });
        }
    ));
};
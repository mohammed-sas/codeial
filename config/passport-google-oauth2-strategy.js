const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const environment = require('./environment');

//tell passport to use new strategy for google login
passport.use(new googleStrategy({
    clientID : environment.google_client_id,
    clientSecret : environment.google_client_secret,
    callbackURL : environment.google_call_back_url
},
    // google generates an access token and sends to use
    // if our access token expires then we use refresh token to get new access token
    // profile info :
    function(accessToken,refreshToken,profile,done){

        // profile can have multiple emails so we receive array of emails
        User.findOne({email : profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log(`error in finding user google auth ${err}`);
                return;
            }
            console.log(profile);

            if(user){
                // if found set this user as req.user
                return done(null,user);
            }else{
                // creating user in db if user does not exist
                User.create({
                    name : profile.displayName,
                    email : profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex'),
                },function(err,user){
                    if(err){
                        console.log(`error in creating user google auth ${err}`);
                        return;
                    }else{
                        return done(null,user);
                    }
                })
            }
        })
    }


));


module.exports = passport;
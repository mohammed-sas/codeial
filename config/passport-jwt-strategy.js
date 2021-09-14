const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

let opts = {
    // header is a list of keys , it has a key called authorisation which is also
    // a list of keys and it has key called bearer which has jwt token
    // the below is used to extract json token
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    // this is our encryption or decryption string for the json token
    secretOrKey : 'codeial',

}

passport.use(new JWTStrategy(opts,function(jwtPayload,done){
    User.findById(jwtPayload._id,function(err,user){
        if(err){
            console.log(`error in find user in jwt ${err}`);
            return;
        }

        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    })
}));

module.exports = passport;
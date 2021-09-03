const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
passport.use(new LocalStrategy({
    usernameField : 'email',
    },
    function(email,password,done){ // done is a function in passport which reports to passport.js
        // find a user and establish identity
        User.findOne({email : email},function (err,user){
            if(err){
                console.log(`error in finding error in passport ${err}`);
                return done(err);
            }

            if(!user || user.password != password){
                console.log(`invalid username and password`);
                return done(null,false);// authentication is not done and its false
            }

            return done(null,user);
        });
    }

)) ;



// serializing the user to decide which key to be kept in the cookies

passport.serializeUser(function(user,done){
    done(null,user.id);

});

// deserializing the user from the cookies

passport.deserializeUser(function(user,done){
    User.findById(id , function (err,user){
        if(err){
            console.log("error in finding user in passort");
            return done(err);
        }

        return done(null,user);
    });
});


module.exports = passport;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
passport.use(new LocalStrategy({
    usernameField : 'email',
    passReqToCallback : true
    },
    function(req, email,password,done){ // done is a function in passport which reports to passport.js
        // find a user and establish identity
        console.log("**************************",email,password);
        User.findOne({email : email},function (err,user){
            if(err){
                req.flash('error',err);
                return done(err);
            }

            if(!user || user.password != password){
                req.flash('error','invalid username and password');
                return done(null,false);// null error and authentication is not done and its false
            }
            return done(null,user); // null error and user found.
        });
    }

)) ;



// serializing the user to decide which key to be kept in the cookies

passport.serializeUser(function(user,done){
    console.log("********serializeUser in passport ********");
    console.log(user);
    done(null,user.id);
    // user._id return a number
    // user.id returns a string

});

// deserializing the user from the cookies file hence we need only the id

passport.deserializeUser(function(id,done){
    console.log("********** deserializer in passport",id);
    User.findById(id , function (err,user){
        if(err){
            console.log("error in finding user in passort");
            return done(err);
        }

        return done(null,user);
    });
});

// check if the user is authenticated
passport.checkAuthentication = function (req,res,next){ // our own function /middleware
    // if the user is signed in pass the req to the controllers action
    console.log("****** checking authentication in passport",req.session);
    console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function (req,res,next){
    if(req.isAuthenticated()){
        // req.user contains the current sign in user from the session cookie and we are sending this to locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;
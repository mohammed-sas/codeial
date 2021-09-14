const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport_local_strategy');
const passportJWT = require('./config/passport-jwt-strategy');
// to persist the cookies(user id) into db even if server restarts
const MongoStore = require('connect-mongo');

//  require sass
const sassMiddleware = require('node-sass-middleware');

const flash = require('connect-flash');
const customMware = require('./config/middleware');
// before the server starts
app.use(sassMiddleware(
    {
        src : './assets/scss',
        dest : './assets/css',
        debug: true,
        outputStyle : 'extended',
        prefix : '/css',
    }
));

// middleware
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));

// make the uploads path available to the broweser
app.use('/uploads',express.static(__dirname + '/uploads'));

app.use(expressLayout);


// extracting styles and scripts from subpages and putting it into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.set('view engine', 'ejs');
app.set('views', './views');
// session
//this middleware creates session from "session store"
app.use(session({
    name: 'codeial',
    // todo to change the secret before production mode
    secret: 'mohammed',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store:MongoStore.create({

        mongoUrl : 'mongodb://localhost/codeial_development',
    }, function (err) {
        console.log("connect mongodb setup", err);
    })
}));

// this assigns passport object to req object and checks if theres an object exists
// if it object exists then "passport " field is present in it
app.use(passport.initialize());

// passport.session looks for "user" field in "req._passport.session" and if it exists
// it sends to deserializer function 
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
// using express router
app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) {
        console.log(`Error on running server ${err}`);
        return;
    }

    console.log(`Server running successfully on : ${port}`);
})
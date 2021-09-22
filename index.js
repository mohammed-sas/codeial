const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayout = require('express-ejs-layouts');
const environment = require('./config/environment');
// for logging purpose
const logger = require('morgan');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport_local_strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
// to persist the cookies(user id) into db even if server restarts
const MongoStore = require('connect-mongo');

//  require sass
const sassMiddleware = require('node-sass-middleware');

const flash = require('connect-flash');
// setting up chatting 
const chatServer = require('http').Server(app);
const chatSockets=require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
const customMware = require('./config/middleware');
// before the server starts
const path = require('path');
if(environment.name == 'development'){
    app.use(sassMiddleware(
        {
            src : path.join(__dirname,environment.asset_path,'scss') ,
            dest : path.join(__dirname,environment.asset_path,'css'),
            debug: true,
            outputStyle : 'extended',
            prefix : '/css',
        }
    ));
}

// middleware
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static(environment.asset_path));

// make the uploads path available to the broweser
app.use('/uploads',express.static(__dirname + '/uploads'));

app.use(logger(environment.morgan.mode,environment.morgan.options));

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
    secret: environment.session_cookie_key,
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
const express = require('express');
const app = express();
const port = 8000;

// using express router

app.use('/',require('./routes'));

app.listen(port,function (err){
    if(err){
        console.log(`Error on running server ${err}`);
        return;
    }

    console.log(`Server running successfully on : ${port}`);
})
const mongoose = require('mongoose');
const environment = require('./environment');
mongoose.connect(`mongodb://localhost/${environment.db}`);
const db = mongoose.connection;
db.on('error',console.error.bind(console,'error connecting to mongo db'));
db.once('open',function(){
    console.log("database successfully connected");
});


module.exports = db;
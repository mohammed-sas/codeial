const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email :{
        type: String,
        required: true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
},{
    timestamps: true // created at and update at timestamp
});

const User = mongoose.model('user',userSchema);
module.exports = User;
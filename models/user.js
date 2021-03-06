const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');
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
    },
    // storing the path of the file in avatar
    avatar : {
        type:String,

    },
    friendships : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Friendship'
    }]
},{
    timestamps: true // created at and update at timestamp
});

let storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,'..',AVATAR_PATH));
    },
    filename : function(req,file,cb){
        // date.now() function appends millisec to filename to make it look uniq file
        cb(null,file.fieldname+'-'+Date.now());
    }
});

// static function
userSchema.statics.uploadedAvatar = multer({ storage : storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;
const User = mongoose.model('User',userSchema);
module.exports = User;
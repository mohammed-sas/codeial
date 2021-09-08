const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        content : {
            type:String,
            required: true
        },
        user : {
            type : mongoose.Schema.Types.ObjectId,
            // this is user.js 
            ref : 'User'

        },
        // include the array of ids of all comments in this post sschema itself
        comment : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Comment'
            }
        ]
    },
    {
        timestamps : true
    }
);

const Post = mongoose.model('Post',postSchema);

module.exports = Post;
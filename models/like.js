const mongoose = require('mongoose');
const likeSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId
    },
    // here likeable refers dynamically either the post or comment collection
    // here the user can either like the post or the comment
    likeable : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        refPath : 'onModel'
    },
    onModel : {
        type : String,
        required : true,
        enum : ['Post','Comment']
    }
    },
    {
        timestamps : true
    }
);

const Like = mongoose.model('Like',likeSchema);
module.exports = Like;
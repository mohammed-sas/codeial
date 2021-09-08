const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){
    Post.findById(req.body.post,function (err,post){
        // first finding a post if it exists and then create a comment for it
        // we do this because user 
        if(post){
            Comment.create({
                content : req.body.content,
                post : req.body.post,
                user : req.user._id
            }, function (err,comments){
                post.comment.push(comments);
                post.save();

                res.redirect('/');
            });
        }
    })
}


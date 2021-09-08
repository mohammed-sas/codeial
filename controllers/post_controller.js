
const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = function(req,res){
    console.log(req.body);
    Post.create(
        {
            content : req.body.content,
            user: req.user._id
        }, function(err ,post){
            if(err){
                console.log(`error in creating post`);
                return;
            }

            return res.redirect('back');
        }
    );
};

module.exports.destroy = function(req,res){
    Post.findById(req.params.id,function (err,post){
        // only the user who has created the post can delete the post
        // _id gives number whereas in mongoose .id converts to string
        if(err){
            console.log(`error in deleting post ${err}`);
            return;
        }

        if(post.user == req.user.id){
            post.remove();
            Comment.deleteMany({post : req.params.id},function(err){
                return res.redirect('back');
            })

        }

        
    })
}
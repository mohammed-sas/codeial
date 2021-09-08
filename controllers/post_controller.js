
const Post = require('../models/post');
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
        if(post.user == req.user.id){

        }
    })
}
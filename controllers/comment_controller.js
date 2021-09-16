const Comment = require('../models/comment');
const Post = require('../models/post');
const commentMailer = require('../mailers/comments_mailer');
module.exports.create = async function(req,res){
    try{
 let post = await Post.findById(req.body.post);
        // first finding a post if it exists and then create a comment for it
        // we do this because user 
        if(post){
           let comments = await Comment.create({
                content : req.body.content,
                post : req.body.post,
                user : req.user._id
            });
            
                post.comment.push(comments);
                post.save();
                await comments.populate('user','email');
                commentMailer.newComment(comments);

                req.flash('success',"Comment posted successfully");
                res.redirect('/');
            
        }
    }catch(err){
        console.log(`error in comment controller ${err}`);
    }
    
}

module.exports.destroy =async function (req,res){
    try{
   let comment = await Comment.findById(req.params.id);
    
        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.remove();
           let post = Post.findByIdAndUpdate(postId,{$pull : {comment : req.params.id}});
                req.flash('error',"comment deleted");
                return res.redirect('back');
            
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log(`error in comment controller ${err}`);
    }
    
}


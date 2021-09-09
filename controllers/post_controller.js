
const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = async function(req,res){
    console.log(req.body);
    try{
     await Post.create(
        {
            content : req.body.content,
            user: req.user._id
        });
        
            return res.redirect('back');
    }catch(err){
        console.log(`error in post controller ${err}`);
    }
        
    
};

module.exports.destroy = async function(req,res){
    try{
     let post = await Post.findById(req.params.id);
        // only the user who has created the post can delete the post
        // _id gives number whereas in mongoose .id converts to string
       

      

    if(post.user == req.user.id){
        post.remove();
        await Comment.deleteMany({post : req.params.id});

            return res.redirect('back');
        
    }
}catch(err){
    console.log(`error in post controller ${err}`);
}

    
}

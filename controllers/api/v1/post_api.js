const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index =async function(req,res){

    let posts = await Post.find({})
                        .sort('-createdAt')
                        .populate('user','-password ')
                        .populate({
                            path : 'comment',
                            populate : {
                                path : 'user',
                                select: '-password'
                            }
                        });

    res.json(200,{
        message : 'list of posts',
        posts : posts
    })
}


module.exports.destroy = async function(req,res){
    try{
     let post = await Post.findById(req.params.id);
        // only the user who has created the post can delete the post
        // _id gives number whereas in mongoose .id converts to string
       
        post.remove();
        await Comment.deleteMany({post : req.params.id});
       

        return res.json(200,{
            message: "post deleted"
        });
        
    
    }catch(err){
    console.log('###### error in post deletion',err);
    return res.status(500).json({
        message : "internal server error"
    })
    }

    
}

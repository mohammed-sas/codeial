const User = require('../models/user');
const Post = require('../models/post');
const Friendship = require('../models/friendship');

module.exports.home = async function(req, res) {

    // Post.find({}, function (err, posts) {
    //     if (err) {
    //         console.log(`error ${err}`);
    //         return;
    //     }
    //     console.log(posts);

    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts: posts
    //     });
    // });
    //    console.log(Post.find({}));
    try{
        let posts = await  Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
        path :'comment',
        populate:{
            path : 'user'
        },
        populate : {
            path : 'likes'
        }
        }).populate('likes');

        
        let currentUser;

        if(req.user){        
        currentUser = await User.findOne({_id : req.user.id});
        await currentUser.populate({
            path : 'friendships',
            populate :{
                path : 'to_user',
                ref : 'User'    
            },
            
            
        });
        
       
        }
        
         

        
        let users =await User.find({});

            return res.render('home', {
            title: "Codeial | Home",
            posts: posts,
            all_users : users,
            currentUser : currentUser
        });
    
    }catch(err){
        console.log(`error in home controller ${err}`);
    }
        
    

    // let posts = await Post.find({}).populate('user');


    
    // return res.render('home',{
    //                     title : "Codeial | Home",
    //                     posts : posts
    //          });
}
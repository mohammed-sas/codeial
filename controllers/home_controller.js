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

        
        let currentUser = await User.findOne({_id : req.user.id});
        
         

        console.log("current user populate ***** ",currentUser);
        await currentUser.populate({
            path : 'friendships',
            populate :{
                path : 'to_user',
                ref : 'User'    
            },
            
            
        });
        console.log('populate user****** ',currentUser);
        console.log(currentUser.friendships[0].to_user.name);
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
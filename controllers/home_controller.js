const User = require('../models/user');
const Post = require('../models/post');

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
    .populate('user')
    .populate({
        path :'comment',
        populate:{
            path : 'user'
        }
    });

let users =await User.find({});

            return res.render('home', {
            title: "Codeial | Home",
            posts: posts,
            all_users : users
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
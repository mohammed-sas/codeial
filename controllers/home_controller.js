const User = require('../models/user');
const Post = require('../models/post');

module.exports.home =  function (req, res) {

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
    Post.find({})
    .populate('user')
    .populate({
        path :'comment',
        populate:{
            path : 'user'
        }
    })
    .exec(function (err, posts) {
        console.log(posts);
        if(err){
            console.log(`error in side populate ${err}`);
            return;
        }
        return res.render('home', {
            title: "Codeial | Home",
            posts: posts
        });
    });

    // let posts = await Post.find({}).populate('user');


    
    // return res.render('home',{
    //                     title : "Codeial | Home",
    //                     posts : posts
    //          });
}
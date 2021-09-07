const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = async function (req, res) {

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
    Post.find({}).populate('user').exec(function (err, posts) {

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
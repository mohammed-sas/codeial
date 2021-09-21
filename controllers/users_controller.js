const User = require('../models/user.js');
const fs = require('fs');
const path = require('path');
module.exports.profile = async function (req,res){

    let friendshipExist = false;
    let loggedInUser = await User.findOne(
        {
            _id : req.user.id , 
           
        }
        );
    await loggedInUser.populate({
        path:'friendships',
        select:'-from_user -createdAt -updatedAt -__v '
    });

    console.log(loggedInUser);
    for(let i = 0 ; i<loggedInUser.friendships.length ; i++){
        if(loggedInUser.friendships[i].to_user == req.params.id){
            friendshipExist = true;
            break;
        }
    }

    console.log('friend  ship exist ***',friendshipExist);
  
    User.findById(req.params.id,function (err,user){
        return res.render('profile',{
            title: 'User profile',
            profile_user : user,
            friendshipExist : friendshipExist
        })
    })
    
};

module.exports.update = async function (req,res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body, function (err,user){
    //         req.flash('success','Updated');
    //         return res.redirect('back');
    //     })
    // }else{
    //     return res.status(401).send('Unauthorized');
    // }

    if(req.user.id == req.params.id){
        try{
            console.log('inside multer upload');

            let user = await  User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('******** Multer error',err);
                }
                console.log(req.file);
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){
                    // if avatar already presents
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }

                    // this is saving the path of the uploaded ffile into the avatar field in the user model
                    user.avatar = User.avatarPath + '/'+req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });

        }catch(err){
            req.flash('error',err);
            return res.redirect('back')
        }
    }else{
        return res.status(401).send('Unauthorized'); 
    }

}

module.exports.signUp = function(req,res){

    if(req.isAuthenticated()){
       return  res.redirect('/users/profile');
    }

    res.render('user_sign_up',{
        title:"Codeial | Sign up"
    });
};

module.exports.signIn = function(req,res){

    if(req.isAuthenticated()){
        console.log('homepage');
        return res.redirect('/');
    }



    res.render('user_sign_in',{
        title :"Codeial | Sign in"
    });
};

// get signup data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
      return  res.redirect('back');
    }

    User.findOne({email :req.body.email},function(err,user){
        if(err){
            console.log(`error in finding user in signing up ${err}`);
            return;
        }

        if(!user){
            User.create(req.body,function (err,user){
                if(err){
                    console.log(`error in finding user in signing up ${err}`);
                    return;
                }
                
                return res.redirect('/users/sign-in');
            });
        }else{
            return res.redirect('back');
        }
    });

};

module.exports.createSession = function(req,res){
    req.flash('success','Logged in Successfully');
        return res.redirect('/');

    
};

module.exports.destroySession = function(req,res) {
    // passport gives this logout function to req 
    req.logout();
    req.flash('success','You have logged out');

    return res.redirect('/');
}
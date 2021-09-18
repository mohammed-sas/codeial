const User = require('../models/user');
const ResetPassword = require('../models/resetPassword');
const crypto = require('crypto');
const resetPasswordMailer = require('../mailers/reset_password_mailer');
const resetPasswordWorker = require('../workers/reset_password_worker');
const queue = require('../config/kue');
module.exports.reset = function(req,res){



    return res.render('resetPassword',{
        title : 'Password reset'
    })
}

module.exports.findEmail = async function (req,res){
    try{
    console.log(req.body);

    let user = await User.findOne({email :req.body.email});
        if(user){
        console.log(user);
        let token = await ResetPassword.create({
            user : user,
            accessToken :crypto.randomBytes(10).toString('hex') ,
            isValid : true,
        });

        console.log(token);

        // resetPasswordMailer.resetPassword(user.email,token.accessToken);
        let job = queue.create('resetPassword',{resetEmail: user.email, resetToken : token.accessToken}).save(function(err){
            if(err){
                console.log(`error in creating queue ${err}`);
                return;
            }

            console.log('queue email job with job id ******* ',job.id);
        });

        
        res.redirect('/');

        }else{
            console.log('user does not exist');
            res.redirect('back');
        }
    }catch(err){
        console.log('error in reset password',err);
    }
}
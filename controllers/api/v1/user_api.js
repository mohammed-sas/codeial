
const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const environment = require('../../../config/environment');

module.exports.createSession = async function(req,res){
    try{
    let user =await User.findOne({email : req.body.email});
    if(!user || user.password != req.body.password){
        return res.json(401,{
            message : 'invalid username or password'
        })
    }

    return res.json(200,{
        message : 'sign in successful , your jwt is generated ',
        data : {
            // here the codeial is the secret string
            token : jwt.sign(user.toJSON(),environment.jwt_secret,{expiresIn : '100000'})
        }
    })

    }catch(err){
        console.log(`error in user api ${err}`);
        return res.json(500,{
            message : 'internal server error'
        });
    }


}
const User = require('../models/user');
const Friendship = require('../models/friendship');


module.exports.add =async function(req,res){
    console.log(req.query);
    let friendship = await Friendship.create({
        from_user : req.query.from_user,
        to_user : req.query.to_user
    });

    console.log('friendship created****',friendship);

    let fromUser = await User.findOne({_id : req.query.from_user});
    let toUser = await User.findOne({_id : req.query.to_user});

    console.log('from user ****',fromUser.name);
    console.log('to user****',toUser.name);
    

    fromUser.friendships.push(friendship);
    fromUser.save();
    toUser.friendships.push(friendship);
    toUser.save();
    return res.render('home');
    


}

module.exports.remove = async function(req,res){
    try{
        console.log("remove friend controllers ****",req.query);

        let friends = await Friendship.findOne({
            from_user: req.query.from_user,
            to_user : req.query.to_user
        })

        console.log(friends);

        await User.findByIdAndUpdate(req.query.from_user,
            {$pull : {friendships : friends._id}});
        
        await User.findByIdAndUpdate(req.query.to_user,
            {$pull : {friendships : friends._id}});
        
        friends.remove();
        return res.redirect('back');
    }catch(err){
        console.log('error in deleting friends',err);
    }


}
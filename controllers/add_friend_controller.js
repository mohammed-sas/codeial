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


}
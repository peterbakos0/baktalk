var deleteMember = require('./delete-member');
var User = require('../../DataModels/User');
var FriendRequest = require('../../DataModels/FriendRequest');
var Friend = require('../../DataModels/Friend');
var Member = require('../../DataModels/Member');
var Client = require('../../DataModels/Client');

var deleteUser = async (userId) => {
    var clientFilter = {
        userId: userId
    };

    var user = await User.findByIdAndDelete(userId);

    await FriendRequest.deleteMany({
        senderUserId: userId
    });

    await Friend.deleteMany({
        userIds: {
            $in: userId
        }
    });

    var members = await Member.find({
        userId: userId
    });

    for(var i = 0; i < members.length; i++) {
        var member = members[i];
        await deleteMember(member._id);
    };

    var clients = await Client.find(clientFilter);
    await Client.deleteMany(clientFilter);

    return {
        user: user,
        clients: clients
    };
};

module.exports = deleteUser;

var FriendRequest = require('../DataModels/FriendRequest');

var getPendingFriendUserIdsUtil = async (userId) => {
    var result = [];

    var friendRequests = await FriendRequest.find({
        $or: [
            {
                senderUserId: userId
            },
            {
                receiverUserId: userId
            }
        ]
    });

    for(var i = 0; i < friendRequests.length; i++) {
        var friendRequest = friendRequests[i];
        var userIds = [friendRequest.senderUserId.toString(), friendRequest.receiverUserId.toString()];

        result.push(userIds[Number(!(userIds.indexOf(userId.toString())))]);
    }

    return result;
};

module.exports = getPendingFriendUserIdsUtil;

var FriendRequest = require('../../DataModels/FriendRequest');

var deleteFriendRequest = async (friendRequestId) => {
    var friendRequest = await FriendRequest.findByIdAndDelete(friendRequestId);
    return friendRequest;
};

module.exports = deleteFriendRequest;

var Friend = require('../../DataModels/Friend');

var deleteFriend = async (friendId) => {
    var friend = await Friend.findByIdAndDelete(friendId);
    return friend;
};

module.exports = deleteFriend;

var jwt = require('jsonwebtoken');
var Client = require('../../DataModels/Client');
var FriendRequest = require('../../DataModels/FriendRequest');

var verifyDeleteFriendRequestRequest = async (friendRequestId, clientToken) => {
    try { var clientTokenData = await jwt.verify(clientToken, process.env.TOKEN_SECRET); }
    catch(error) { return false; }

    var client = await Client.findById(clientTokenData.clientId);
    if(!client) { return false; }

    var friendRequestCanDelete = await FriendRequest.exists({
        _id: friendRequestId,
        $or: [
            {
                senderUserId: client.userId
            },
            {
                receiverUserId: client.userId
            }
        ]
    });
    if(!friendRequestCanDelete) { return false; }

    return true;
};

module.exports = verifyDeleteFriendRequestRequest;

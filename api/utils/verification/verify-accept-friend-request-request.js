var jwt = require('jsonwebtoken');
var Client = require('../../DataModels/Client');
var FriendRequest = require('../../DataModels/FriendRequest');

var verifyAcceptFriendRequestRequest = async (friendRequestId, clientToken) => {
    try { var clientTokenData = await jwt.verify(clientToken, process.env.TOKEN_SECRET); }
    catch(error) { return false; }

    var client = await Client.findById(clientTokenData.clientId);
    if(!client) { return false; }

    var userIsReceiverOfFriendRequest = await FriendRequest.exists({
        _id: friendRequestId,
        receiverUserId: client.userId
    });
    if(!userIsReceiverOfFriendRequest) { return false; }

    return true;
};

module.exports = verifyAcceptFriendRequestRequest;

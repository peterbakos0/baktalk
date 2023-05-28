var jwt = require('jsonwebtoken');
var Client = require('../../DataModels/Client');
var User = require('../../DataModels/User');
var FriendRequest = require('../../DataModels/FriendRequest');
var Friend = require('../../DataModels/Friend');

var verifySendFriendRequestRequest = async (receiverUserId, clientToken) => {
    try { var clientTokenData = await jwt.verify(clientToken, process.env.TOKEN_SECRET); }
    catch(error) { return false; }

    var client = await Client.findById(clientTokenData.clientId);
    if(!client) { return false; }

    if(receiverUserId === client.userId.toString()) { return false; }

    var receiverUserIdExists = await User.exists({
        _id: receiverUserId
    });
    if(!receiverUserIdExists) { return false; }

    var friendRequestPendingBetweenTheTwo = await FriendRequest.exists({
        $or: [
            {
                senderUserId: client.userId,
                receiverUserId: receiverUserId
            },
            {
                senderUserId: receiverUserId,
                receiverUserId: client.userId
            }
        ]
    });
    if(friendRequestPendingBetweenTheTwo) { return false; }

    var areFriends = await Friend.exists({
        $and: [
            {
                userIds: {
                    $in: client.userId
                }
            },
            {
                userIds: {
                    $in: receiverUserId
                }
            }
        ]
    });
    if(areFriends) { return false; }

    return true;
};

module.exports = verifySendFriendRequestRequest;

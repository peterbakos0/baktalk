var jwt = require('jsonwebtoken');
var Client = require('../../DataModels/Client');
var Friend = require('../../DataModels/Friend');

var verifyUnfriendRequest = async (friendId, clientToken) => {
    try { var clientTokenData = await jwt.verify(clientToken, process.env.TOKEN_SECRET); }
    catch(error) { return false; }

    var client = await Client.findById(clientTokenData.clientId);
    if(!client) { return false; }

    var areFriends = await Friend.exists({
        _id: friendId,
        userIds: {
            $in: client.userId
        }
    });
    if(!areFriends) { return false; }

    return true;
};

module.exports = verifyUnfriendRequest;

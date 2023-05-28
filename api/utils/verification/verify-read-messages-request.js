var jwt = require('jsonwebtoken');
var Client = require('../../DataModels/Client');
var DirectMessaging = require('../../DataModels/DirectMessaging');
var Channel = require('../../DataModels/Channel');
var Member = require('../../DataModels/Member');

var verifyReadMessagesRequest = async (messageParentType, messageParentId, clientToken) => {
    try { var clientTokenData = await jwt.verify(clientToken, process.env.TOKEN_SECRET); }
    catch(error) { return false; }

    var client = await Client.findById(clientTokenData.clientId);
    if(!client) { return false; }

    if(messageParentType === 'directMessaging') {
        var userIsInDirectMessaging = await DirectMessaging.exists({
            _id: messageParentId,
            userIds: {
                $in: client.userId
            }
        });
        if(!userIsInDirectMessaging) { return false; }
    }
    else if(messageParentType === 'channel') {
        var channel = await Channel.findById(messageParentId);

        var userIsMemberOfRoom = await Member.exists({
            userId: client.userId,
            roomId: channel.roomId
        });
        if(!userIsMemberOfRoom) { return false; }
    }

    return true;
};

module.exports = verifyReadMessagesRequest;

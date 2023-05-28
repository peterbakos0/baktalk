var jwt = require('jsonwebtoken');
var Client = require('../../DataModels/Client');
var Message = require('../../DataModels/Message');
var DirectMessaging = require('../../DataModels/DirectMessaging');
var Member = require('../../DataModels/Member');
var Channel = require('../../DataModels/Channel');

var verifyUpdateMessageRequest = async (messageId, messageText, pinned, clientToken) => {
    try { var clientTokenData = await jwt.verify(clientToken, process.env.TOKEN_SECRET); }
    catch(error) { return false; }

    var client = await Client.findById(clientTokenData.clientId);
    if(!client) { return false; }

    var message = await Message.findById(messageId);
    if(!message) { return false; }

    if(message.parentType === 'directMessaging') {
        if(messageText !== undefined && message.authorId.toString() !== client.userId.toString()) { return false; }

        if(pinned !== undefined) {
            var userIsInDirectMessaging = await DirectMessaging.exists({
                _id: message.parentId,
                userIds: {
                    $in: client.userId
                }
            });
            if(!userIsInDirectMessaging) { return false; }
        }
    }
    else if(message.parentType === 'channel') {
        if(messageText !== undefined) {
            var userIsAuthorOfMessage = await Member.exists({
                _id: message.authorId,
                userId: client.userId
            });
            if(!userIsAuthorOfMessage) { return false; }
        }

        if(pinned !== undefined) {
            var channel = await Channel.findById(message.parentId);

            var userIsMemberOfRoom = await Member.exists({
                userId: client.userId,
                roomId: channel.roomId
            });
            if(!userIsMemberOfRoom) { return false; }
        }
    }

    return true;
};

module.exports = verifyUpdateMessageRequest;

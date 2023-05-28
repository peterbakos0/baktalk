var jwt = require('jsonwebtoken');
var Client = require('../../DataModels/Client');
var Message = require('../../DataModels/Message');
var Member = require('../../DataModels/Member');
var Channel = require('../../DataModels/Channel');

var verifyDeleteMessageRequest = async (messageId, clientToken) => {
    try { var clientTokenData = await jwt.verify(clientToken, process.env.TOKEN_SECRET); }
    catch(error) { return false; }

    var client = await Client.findById(clientTokenData.clientId);
    if(!client) { return false; }

    var message = await Message.findById(messageId);
    if(!message) { return false; }

    if(message.parentType === 'directMessaging') {
        if(message.authorId.toString() !== client.userId.toString()) { return false; }
    }
    else if(message.parentType === 'channel') {
        var userIsAuthorOfMessage = await Member.exists({
            _id: message.authorId,
            userId: client.userId
        });

        if(!userIsAuthorOfMessage) {
            var channel = await Channel.findById(message.parentId);

            var userHasAdminRoleInRoom = await Member.exists({
                role: 'admin',
                userId: client.userId,
                roomId: channel.roomId
            });
            if(!userHasAdminRoleInRoom) { return false; }
        }
    }

    return true;
};

module.exports = verifyDeleteMessageRequest;

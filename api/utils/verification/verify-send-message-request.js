var jwt = require('jsonwebtoken');
var Client = require('../../DataModels/Client');
var DirectMessaging = require('../../DataModels/DirectMessaging');
var Channel = require('../../DataModels/Channel');
var Member = require('../../DataModels/Member');
var Room = require('../../DataModels/Room');
var Message = require('../../DataModels/Message');

var verifySendMessageRequest = async (messageText, fileIds, reMessageId, messageParentType, messageParentId, clientToken) => {
    try { var clientTokenData = await jwt.verify(clientToken, process.env.TOKEN_SECRET); }
    catch(error) { return false; }

    var client = await Client.findById(clientTokenData.clientId);
    if(!client) { return false; }

    var messageParent;
    if(messageParentType === 'directMessaging') {
        messageParent = await DirectMessaging.findOne({
            _id: messageParentId,
            userIds: {
                $in: client.userId
            }
        });
    }
    else if(messageParentType === 'channel') {
        var channel = await Channel.findById(messageParentId);

        if(channel) {
            var userIsMemberOfRoom = await Member.exists({
                userId: client.userId,
                roomId: channel.roomId
            });

            if(userIsMemberOfRoom) { messageParent = channel; }
        }
    }

    if(!messageParent) { return false; }

    if(!(messageText.length || fileIds.length)) { return false; }

    var availableFileIds;
    if(messageParentType === 'directMessaging') {
        availableFileIds = messageParent.fileIds;
    }
    else if(messageParentType === 'channel') {
        var room = await Room.findById(messageParent.roomId);
        availableFileIds = room.fileIds;
    }

    for(var i = 0; i < fileIds.length; i++) {
        var fileId = fileIds[i];

        var fileIdExists = availableFileIds.includes(fileId);
        if(!fileIdExists) { return false; }
    }

    if(reMessageId !== null) {
        var reMessageHasSameParent = await Message.exists({
            _id: reMessageId,
            parentType: messageParentType,
            parentId: messageParentId
        });
        if(!reMessageHasSameParent) { return false; }
    }

    return true;
};

module.exports = verifySendMessageRequest;

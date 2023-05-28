var DirectMessaging = require('../../DataModels/DirectMessaging');
var Channel = require('../../DataModels/Channel');
var Member = require('../../DataModels/Member');
var Client = require('../../DataModels/Client');

var notifyAboutReadMessagesOperation = async (messageParentType, messageParentId, messages, io) => {
    var messageIds = [];
    for(var i = 0; i < messages.length; i++) { messageIds.push(messages[i]._id); }

    var userIds;
    if(messageParentType === 'directMessaging') {
        var directMessaging = await DirectMessaging.findById(messageParentId);
        userIds = directMessaging.userIds;
    }
    else if(messageParentType === 'channel') {
        var channel = await Channel.findById(messageParentId);

        var members = await Member.find({
            roomId: channel.roomId
        });

        userIds = [];
        for(var i = 0; i < members.length; i++) { userIds.push(members[i].userId); }
    }

    var clientsToNotify = await Client.find({
        socketId: {
            $ne: null
        },
        peerId: {
            $ne: null
        },
        userId: {
            $in: userIds
        }
    });

    for(var i = 0; i < clientsToNotify.length; i++) {
        var clientToNotify = clientsToNotify[i];

        io.to(clientToNotify.socketId).emit('message-change', {
            messageIds: messageIds
        });
    }
};

module.exports = notifyAboutReadMessagesOperation;

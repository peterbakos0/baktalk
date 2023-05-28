var DirectMessaging = require('../../DataModels/DirectMessaging');
var Channel = require('../../DataModels/Channel');
var Member = require('../../DataModels/Member');
var Client = require('../../DataModels/Client');

var notifyAboutUpdateMessageOperation = async (message, io) => {
    var userIds;
    if(message.parentType === 'directMessaging') {
        var directMessaging = await DirectMessaging.findById(message.parentId);
        userIds = directMessaging.userIds;
    }
    else if(message.parentType === 'channel') {
        var channel = await Channel.findById(message.parentId);

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
            messageIds: [message._id]
        });
    }
};

module.exports = notifyAboutUpdateMessageOperation;

var Client = require('../../DataModels/Client');

var notifyAboutStartDirectMessagingOperation = async (directMessaging, io) => {
    var clientsToNotify = await Client.find({
        socketId: {
            $ne: null
        },
        peerId: {
            $ne: null
        },
        userId: {
            $in: directMessaging.userIds
        }
    });

    for(var i = 0; i < clientsToNotify.length; i++) {
        var clientToNotify = clientsToNotify[i];
        io.to(clientToNotify.socketId).emit('user-data-change');
    }
};

module.exports = notifyAboutStartDirectMessagingOperation;

var Client = require('../../DataModels/Client');

var notifyAboutDeleteFriendRequestOperation = async (friendRequest, io) => {
    var clientsToNotify = await Client.find({
        socketId: {
            $ne: null
        },
        peerId: {
            $ne: null
        },
        userId: {
            $in: [friendRequest.senderUserId, friendRequest.receiverUserId]
        }
    });

    for(var i = 0; i < clientsToNotify.length; i++) {
        var clientToNotify = clientsToNotify[i];
        io.to(clientToNotify.socketId).emit('user-data-change');
    }
};

module.exports = notifyAboutDeleteFriendRequestOperation;

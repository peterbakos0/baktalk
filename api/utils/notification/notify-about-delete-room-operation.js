var Client = require('../../DataModels/Client');

var notifyAboutDeleteRoomOperation = async (members, io) => {
    var userIds = [];
    for(var i = 0; i < members.length; i++) { userIds.push(members[i].userId); }

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
        io.to(clientToNotify.socketId).emit('user-data-change');
    }
};

module.exports = notifyAboutDeleteRoomOperation;

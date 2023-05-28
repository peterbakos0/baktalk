var getContactUserIdsUtil = require('../get-contact-user-ids-util');
var getPendingFriendUserIdsUtil = require('../get-pending-friend-user-ids-util');
var Client = require('../../DataModels/Client');

var notifyAboutExpiredClientsDeletion = async (clients, io) => {
    var userIds = [];
    for(var i = 0; i < clients.length; i++) {
        var client = clients[i];

        var contactUserIds = await getContactUserIdsUtil(client.userId);
        var pendingFriendUserIds = await getPendingFriendUserIdsUtil(client.userId);

        userIds = Array.from(new Set(userIds.concat(client.userId, contactUserIds, pendingFriendUserIds)));
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
        io.to(clientToNotify.socketId).emit('user-data-change');
    }
};

module.exports = notifyAboutExpiredClientsDeletion;

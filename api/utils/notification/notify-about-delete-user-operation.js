var getContactUserIdsUtil = require('../get-contact-user-ids-util');
var getPendingFriendUserIdsUtil = require('../get-pending-friend-user-ids-util');
var Client = require('../../DataModels/Client');

var notifyAboutDeleteUserOperation = async (user, io) => {
    var contactUserIds = await getContactUserIdsUtil(user._id);
    var pendingFriendUserIds = await getPendingFriendUserIdsUtil(user._id);

    var userIds = Array.from(new Set(contactUserIds.concat(pendingFriendUserIds)));

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

module.exports = notifyAboutDeleteUserOperation;

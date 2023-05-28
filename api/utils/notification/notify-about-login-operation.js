var getOtherUserIdsUtil = require('../get-other-user-ids-util');
var Client = require('../../DataModels/Client');

var notifyAboutLoginOperation = async (client, io) => {
    var otherUserIds = await getOtherUserIdsUtil(client.userId);

    var clientsToNotify = await Client.find({
        _id: {
            $ne: client._id
        },
        socketId: {
            $ne: null
        },
        peerId: {
            $ne: null
        },
        userId: {
            $in: ([client.userId].concat(otherUserIds))
        }
    });

    for(var i = 0; i < clientsToNotify.length; i++) {
        var clientToNotify = clientsToNotify[i];
        io.to(clientToNotify.socketId).emit('user-data-change');
    }
};

module.exports = notifyAboutLoginOperation;

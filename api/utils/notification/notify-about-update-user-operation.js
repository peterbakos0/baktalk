var getOtherUserIdsUtil = require('../get-other-user-ids-util');
var Client = require('../../DataModels/Client');

var notifyAboutUpdateUserOperation = async (user, io) => {
    var otherUserIds = await getOtherUserIdsUtil(user._id);

    var clientsToNotify = await Client.find({
        socketId: {
            $ne: null
        },
        peerId: {
            $ne: null
        },
        userId: {
            $in: ([user._id].concat(otherUserIds))
        }
    });

    for(var i = 0; i < clientsToNotify.length; i++) {
        var clientToNotify = clientsToNotify[i];
        io.to(clientToNotify.socketId).emit('user-data-change');
    }
};

module.exports = notifyAboutUpdateUserOperation;

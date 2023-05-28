var Member = require('../../DataModels/Member');
var Client = require('../../DataModels/Client');

var notifyAboutDeleteRoomInvitationOperation = async (roomInvitation, io) => {
    var members = await Member.find({
        roomId: roomInvitation.roomId
    });

    var memberUserIds = [];
    for(var i = 0; i < members.length; i++) { memberUserIds.push(members[i].userId) }

    var clientsToNotify = await Client.find({
        socketId: {
            $ne: null
        },
        peerId: {
            $ne: null
        },
        userId: {
            $in: ([roomInvitation.receiverUserId].concat(memberUserIds))
        }
    });

    for(var i = 0; i < clientsToNotify.length; i++) {
        var clientToNotify = clientsToNotify[i];
        io.to(clientToNotify.socketId).emit('user-data-change');
    }
};

module.exports = notifyAboutDeleteRoomInvitationOperation;

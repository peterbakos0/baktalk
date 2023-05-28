var Member = require('../../DataModels/Member');
var Client = require('../../DataModels/Client');

var notifyAboutAddFileOperation = async (fileParentType, fileParent, io) => {
    var userIds;
    if(fileParentType === 'directMessaging') {
        userIds = fileParent.userIds;
    }
    else if(fileParentType === 'room') {
        var members = await Member.find({
            roomId: fileParent._id
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
        io.to(clientToNotify.socketId).emit('user-data-change');
    }
};

module.exports = notifyAboutAddFileOperation;

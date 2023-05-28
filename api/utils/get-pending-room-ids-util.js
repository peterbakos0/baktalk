var RoomInvitation = require('../DataModels/RoomInvitation');

var getPendingRoomIdsUtil = async (userId) => {
    var result = [];

    var incomingRoomInvitations = await RoomInvitation.find({
        receiverUserId: userId
    });

    for(var i = 0; i < incomingRoomInvitations.length; i++) {
        var incomingRoomInvitation = incomingRoomInvitations[i];
        result.push(incomingRoomInvitation.roomId);
    }

    return result;
};

module.exports = getPendingRoomIdsUtil;
